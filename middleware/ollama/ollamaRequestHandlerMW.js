const { modelTask, modelSytax } = require("../../ai/models");
const { memoryServiceInstance } = require("../../ai/msContainer");
const responseValidator = require("./responseValidator");

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

            console.log("prompt:", prompt);

            let systemPrompt = prompt.match(/<\|im_start\|>system([\s\S]*?)<\|im_end\|>/);
            systemPrompt = systemPrompt ? systemPrompt[0] : null;
            let userPrompt = prompt.match(/<\|im_start\|>user([\s\S]*?)<\|im_end\|>/);
            userPrompt = userPrompt ? userPrompt[0] : null;
/*
           const vectorStore = await Chroma.fromExistingCollection(
                home3bEmbeddings,
                { collectionName: process.env.CHROMADB_COLLECTION , url: process.env.CHROMADB },
            );

            //Get retriever
            const chromaRetriever = vectorStore.asRetriever();

            console.log("userPrompt:", userPrompt);

            //ASK LLAMA
            const llamaQuestionPrompt = PromptTemplate.fromTemplate(`
                Convert the following question into a short strict standalone task. Use english language only.
                "{userQuestion}"`
            );
            
            const llamaQuestionChain = llamaQuestionPrompt.pipe(llama);
            const llamaAnswer = await llamaQuestionChain.invoke({
                userQuestion: userPrompt
            });

            console.log("llamaAnswer:", llamaAnswer);

            //ASK HOME3B
            const home3bQuestionPrompt = PromptTemplate.fromTemplate(`
                For the following user question, create a valid task inside a homeassistant tag.
                {userQuestion}`
            );

            const home3bQuestionChain = home3bQuestionPrompt.pipe(home3b).pipe(new StringOutputParser()).pipe(chromaRetriever);

            const documents = await home3bQuestionChain.invoke({
                userQuestion: userPrompt
            });

            const combinedDocs = combineDocuments(documents);

            const questionTemplate = PromptTemplate.fromTemplate(`
                You are a homassistant prompter. You have to create a valid task inside a homeassistant tag for the user question.
                <context>
                {context}
                </context>
                task: {prompt}
            `);

            const answerChain = questionTemplate.pipe(home3b);

            const llmResponse = await answerChain.invoke({
                context: combinedDocs,
                prompt: llamaAnswer,
            });
            */

            let llmResponse = null;
            let numberOfTries = 0;

            do{
                llmResponse = await memoryServiceInstance.service.getRelevantMemory(userPrompt);
                console.log("llmResponse:", llmResponse);
            }while(!responseValidator(llmResponse) && numberOfTries++ < 10);

            res.ollamaResponse = llmResponse;
            return next();

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
};