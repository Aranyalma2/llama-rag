const { runTest } = require('./test');

const args = process.argv.slice(2);

const verboseError = args.includes('--verbose');

if (verboseError) {
    console.log('Verbose error mode is on.');
}


(async () => {
    /**
     * Test1 import and run
     */
    {
        const { userPrompt, systemPrompt, response } = require('./data/test1');
        await runTest('Test1', systemPrompt, userPrompt, response, true);
    }
    /**
     * Test2 import and run
     */

    {
        const { userPrompt, systemPrompt, response } = require('./data/test2');
        await runTest('Test2', systemPrompt, userPrompt, response, verboseError);
    }
    /**
     * Test3 import and run
     */
    {
        const { userPrompt, systemPrompt, response } = require('./data/test3');
        await runTest('Test3', systemPrompt, userPrompt, response, verboseError);
    }
    /**
     * Test4 import and run
     */
    {
        const { userPrompt, systemPrompt, response } = require('./data/test4');
        await runTest('Test4', systemPrompt, userPrompt, response, verboseError);
    }
})();
