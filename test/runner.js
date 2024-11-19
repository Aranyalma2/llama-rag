const { runTest } = require('./test');
const { userPrompt, systemPrompt, response } = require('./data/test1');


(async () => {

    await runTest('Test1', systemPrompt, userPrompt, response);
    
})();
