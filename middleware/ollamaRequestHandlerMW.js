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

            const chromaRetriever = vectorStore.asRetriever();

            const simpleQuestionChain = simpleQuestionPrompt.pipe(ollamaLlm).pipe(new StringOutputParser()).pipe(chromaRetriever);

            const documents = await simpleQuestionChain.invoke({
                userQuestion: prompt
            });



        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
};