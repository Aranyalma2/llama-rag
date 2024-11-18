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
            return;
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

module.exports = { sendGenerateRequest, validateResponse, promptCreator };