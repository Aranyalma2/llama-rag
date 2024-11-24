const userPrompt = "Turn off ceiling lamp";

const systemPrompt = `<|im_start|>system
light.reading_lamp 'attic reading_lamp' = off
light.reading_lamp 'reading lamp' = off
sensor.solax_srqn3kjshz_yield_today 'solarpanel Yield today' = 3.9 kWh
sensor.solax_srqn3kjshz_yield_today 'solarpanel production' = 3.9 kWh 
light.ceiling_lamp 'attic ceiling_lamp' = on
light.bed_lamp 'attic bed_lamp' = off
light.bathroom_lamp 'attic bathroom_lamp' = off<|im_end|>`;

const response = `\`\`\`homeassistant
{"service": "light.turn_off", "target_device": "light.ceiling_lamp"}
\`\`\``;

const isComplex = false;

module.exports = { userPrompt, systemPrompt, response, isComplex };