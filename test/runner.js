const { sendGenerateRequest, validateResponse, promptCreator } = require('./test');
const { userPrompt, systemPrompt, response } = require('./data/test1');

const prompt = promptCreator(systemPrompt, userPrompt);

const NUMBER_OF_RUNS = 10;

(async () => {

    console.log('Running test...');

    let numberOfSuccesses = 0;

    for (let i = 0; i < NUMBER_OF_RUNS; i++) {
        try {
            const result = await sendGenerateRequest('model1', prompt);
            if (validateResponse(result, response)) {
                numberOfSuccesses++;
            }
        } catch (error) {
            console.error(`Run ${i + 1} failed with error: ${error.message}`);
        }
    }

    console.log(`Success rate: ${numberOfSuccesses}/${NUMBER_OF_RUNS}`);
})();
