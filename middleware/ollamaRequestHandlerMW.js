const { vectorStore, ollamaLlm, ollamaEmbeddings } = require('./global.js');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');

function combineDocuments(docs) {
    return docs.map((doc) => doc.pageContent).join('\n\n');
}

module.exports = function () {

    return async function (req, res, next) {
        try {
            // Expecting Ollama-style POST request with 'model' and 'prompt' in the body
            const { model, prompt } = req.body;

            if (!model || !prompt) {
                return res.status(400).json({
                    message: 'Invalid request: `model` and `prompt` fields are required.'
                });
            }

            const systemPrompt = prompt.match(/<\|im_start\|>system([\s\S]*?)<\|im_end\|>/)[1] | "";
            const userPrompt = prompt.match(/<\|im_start\|>user([\s\S]*?)<\|im_end\|>/)[1] | "";

            console.log("System Prompts:", systemPrompt);
            console.log("User Prompts:", userPrompt);

            const chromaRetriever = (await vectorStore).asRetriever();

            const simpleQuestionPrompt = PromptTemplate.fromTemplate(`
                    {systemPrompt}
                    Task: "{userQuestion}"`
            );

            const simpleQuestionChain = simpleQuestionPrompt.pipe(ollamaLlm).pipe(new StringOutputParser()).pipe(chromaRetriever);

            const documents = await simpleQuestionChain.invoke({
                systemPrompt: systemPrompt,
                userQuestion: userPrompt
            });

            const combinedDocs = combineDocuments(documents);

            const questionTemplate = PromptTemplate.fromTemplate(`
                Create homeassistant yaml task for: {prompt} use the following <context>{context}</context>
            `);

            const answerChain = questionTemplate.pipe(ollamaLlm);

            const llmResponse = await answerChain.invoke({
                context: combinedDocs,
                prompt: userPrompt
            });

            res.ollamaResponse = llmResponse;
            next();

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
};