const { runTest } = require('./test');

const args = process.argv.slice(2);

const verboseError = args.includes('--verbose');

if (verboseError) {
    console.log('Verbose error mode is on.');
}

class Statistics {
    totalSimple = 0;
    successSimple = 0;

    totalComplex = 0;
    successComplex = 0;

    increaseStatistics(isComplex, total, success) {
        if (isComplex) {
            this.totalComplex += total;
            this.successComplex += success;
        } else {
            this.totalSimple += total;
            this.successSimple += success;
        }
    }
};

const statistics = new Statistics();


(async () => {
    /**
     * Test1 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test1');
        const { runs, success }  = await runTest('Test1', systemPrompt, userPrompt, response, true);
        statistics.increaseStatistics(isComplex, runs, success);
    }
    /**
     * Test2 import and run
     */

    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test2');
        const { runs, success } = await runTest('Test2', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }
    /**
     * Test3 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test3');
        const { runs, success } = await runTest('Test3', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }
    /**
     * Test4 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test4');
        const { runs, success } = await runTest('Test4', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }

    /**
     * Test5 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test5');
        const { runs, success } = await runTest('Test5', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }

    /**
     * Test6 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test6');
        const { runs, success } = await runTest('Test6', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }

    /**
     * Test7 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test7');
        const { runs, success } = await runTest('Test7', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }

    /**
     * Test8 import and run
     */
    {
        const { userPrompt, systemPrompt, response, isComplex } = require('./data/test8');
        const { runs, success } = await runTest('Test8', systemPrompt, userPrompt, response, verboseError);
        statistics.increaseStatistics(isComplex, runs, success);
    }

    console.log('\x1b[1;37m%s\x1b[0m',`Simple tests finished with success rate: ${statistics.successSimple}/${statistics.totalSimple}.`);
    console.log('\x1b[1;37m%s\x1b[0m',`Complex tests finished with success rate: ${statistics.successComplex}/${statistics.totalComplex}.`);

})();
