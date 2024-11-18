const userPrompt = "Turn off ceiling lamp";

const systemPrompt = "";

const response = `\`\`\`homeassistant
{"service": "light.turn_off", "target_device": "light.brother_ceiling"}
\`\`\``;

module.exports = { userPrompt, systemPrompt, response };