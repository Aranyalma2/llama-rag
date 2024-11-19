const { runTest } = require('./test');

const args = process.argv.slice(2);

const verboseError = args.includes('--verbose');

if(verboseError) {
    console.log('Verbose error mode is on.');
}


(async () => {
    /**
     * Test1 import and run
     */
    {
        const { userPrompt, systemPrompt, response } = require('./data/test1');
        await runTest('Test1', systemPrompt, userPrompt, response, verboseError);
    }
    /**
     * Test2 import and run
     */
    {
        const { userPrompt, systemPrompt, response } = require('./data/test2');
        await runTest('Test2', systemPrompt, userPrompt, response, verboseError);
    }
    
})();
