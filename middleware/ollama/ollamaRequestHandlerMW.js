const { getGlobalMemoryServiceContainer } = require("../../ai/msContainer");
const responseValidator = require("./responseValidator");

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

            //ASK TASK GENERATOR MODEL
            const taskQuestionPrompt = `
                Convert the following question into a short strict standalone task. Use english language only. Do not explan the question, just translate and summurize it.
                Question: ${userPrompt}
            `;
            
            console.log('taskQuestionPrompt:', taskQuestionPrompt);

            const memeoryService1 = getGlobalMemoryServiceContainer().getInstance('model1');
            
            const taskGeneratorAnswer = await memeoryService1.getRelevantMemory(taskQuestionPrompt);
            console.log('Chain1:', taskGeneratorAnswer);

            const memeoryService2 = getGlobalMemoryServiceContainer().getInstance('model2');
            let syntaxGeneratorAnswer = null;
            let numberOfTries = 0;

            do{
                syntaxGeneratorAnswer = await memeoryService2.getRelevantMemory(taskGeneratorAnswer);
                console.log(`Chain2 - ${numberOfTries+1}. try:`, syntaxGeneratorAnswer);
            }while(!responseValidator(syntaxGeneratorAnswer) && numberOfTries++ < 10);

            res.ollamaResponse = syntaxGeneratorAnswer;
            return next();

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
};