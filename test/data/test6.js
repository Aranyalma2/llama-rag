const userPrompt = "I am going to work lock the door";

const systemPrompt = `<|im_start|>system
light.reading_lamp 'attic reading_lamp' = off
light.reading_lamp 'reading lamp' = off
sensor.solax_srqn3kjshz_yield_today 'solarpanel Yield today' = 3.9 kWh
sensor.solax_srqn3kjshz_yield_today 'solarpanel production' = 3.9 kWh 
light.ceiling_lamp 'attic ceiling_lamp' = off
light.bed_lamp 'attic bed_lamp' = off
light.kitchen_main_lamp 'kitchen lamp' = off
lock.front_door 'front door' = Open
light.bathroom_lamp 'attic bathroom_lamp' = off<|im_end|>`;

const response = `\`\`\`homeassistant
{"service": "lock.lock", "target_device": "lock.front_door"}
\`\`\``;

const isComplex = false;

module.exports = { userPrompt, systemPrompt, response, isComplex };