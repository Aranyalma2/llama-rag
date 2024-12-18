const { getGlobalMemoryServiceContainer } = require("../../ai/msContainer");
const responseValidator = require("./responseValidator");
const responseCorrector = require("./responseCorrector");

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

            console.log('------------------------------------------------------------------------------------');
            console.log('\x1b[1;37mUser prompt\x1b[0m:', prompt);

            let systemPrompt = prompt.match(/(?<=<\|im_start\|>system)([\s\S]*?)(?=<\|im_end\|>)/);
            systemPrompt = systemPrompt ? systemPrompt[0] : null;
            let userPrompt = prompt.match(/(?<=<\|im_start\|>user)([\s\S]*?)(?=<\|im_end\|>)/);
            userPrompt = userPrompt ? userPrompt[0] : null;

            //ASK TASK GENERATOR MODEL
            const taskQuestionPrompt = `
                Convert the following question into a short strict standalone instruction. Use english language only. Do not explain the question, just translate and summurize it. You can turn off only the devices that are on.
                Question: ${userPrompt}
                The current state of devices: ${systemPrompt}
            `;

            const memeoryService1 = getGlobalMemoryServiceContainer().getInstance('model1');

            const taskGeneratorAnswer = await memeoryService1.getRelevantMemory(taskQuestionPrompt);
            console.log('\x1b[1;37mChain1\x1b[0m:', taskGeneratorAnswer);

            const memeoryService2 = getGlobalMemoryServiceContainer().getInstance('model2');
            let syntaxGeneratorAnswer = null;
            let numberOfTries = 0;

            do {
                syntaxGeneratorAnswer = await memeoryService2.getRelevantMemory(taskGeneratorAnswer);
                const { correctedAnswer, changed } = responseCorrector(syntaxGeneratorAnswer);
                if (changed) {
                    syntaxGeneratorAnswer = correctedAnswer;
                    console.log(`\x1b[1;37mChain2\x1b[0m - \x1b[0;36m${numberOfTries + 1}. try\x1b[0m:`, '\x1b[0;31mCorrected\x1b[0m');
                }
                console.log(`\x1b[1;37mChain2\x1b[0m - \x1b[0;36m${numberOfTries + 1}. try\x1b[0m:`, syntaxGeneratorAnswer);
            } while (!responseValidator(syntaxGeneratorAnswer) && numberOfTries++ < 10);

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