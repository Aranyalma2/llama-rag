const axios = require('axios');

const PORT = process.env.PORT || 3000;

async function sendGenerateRequest(model, prompt) {
    try {
        const response = await axios.post(`http://localhost:${PORT}/api/generate`, {
            model: model,
            prompt: prompt
        });
        if (response.status !== 200) {
            console.error('Error:', response.data);
            return "No response";
        }
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

function validateResponse(response, hasToContain) {
    const text = response.response.replace(/\s/g, "");
    hasToContain = hasToContain.replace(/\s/g, "");
    return text.includes(hasToContain);
}

function promptCreator(systemPrompt, userPrompt) {
    return `<|im_start|>system${systemPrompt}<|im_end|><|im_start|>user${userPrompt}<|im_end|>`;
}

async function runTest(testName, systemPrompt, userPrompt, expectedResponse, verbose = false) {

    const NUMBER_OF_RUNS = 10;

    console.log('\x1b[1;37m%s\x1b[0m',`Running test: ${testName}`);

    const prompt = promptCreator(systemPrompt, userPrompt);

    let numberOfSuccesses = 0;

    for (let i = 0; i < NUMBER_OF_RUNS; i++) {
        try {
            const response = await sendGenerateRequest('model', prompt);
            if (validateResponse(response, expectedResponse)) {
                numberOfSuccesses++;
            }
            else if (verbose) {
                console.error(`Run ${i + 1} failed:\n` +
                    `- Question: ${userPrompt}\n` +
                    `- Response: ${response.response}`);
            }
        } catch (error) {
            console.error(`Run ${i + 1} failed with serius error: ${error.message}`);
        }
    }
    if(numberOfSuccesses == NUMBER_OF_RUNS) {
        console.log(`\x1b[0;32m'${testName}' finished with success rate: ${numberOfSuccesses}/${NUMBER_OF_RUNS}.\x1b[0m`);
    }
    else {
        console.log(`\x1b[0;33m'${testName}' finished with success rate: ${numberOfSuccesses}/${NUMBER_OF_RUNS}.\x1b[0m`);
    }

    return {runs: NUMBER_OF_RUNS, success: numberOfSuccesses};
}

module.exports = { runTest };