# llama-rag
This is a university project for use a RAG middleware between Home Assisant and llama.

## Install dependecies
```sh
yarn install
```

## Run with memory vector store
```sh
yarn start
```

## For select the RAG data set check:
```sh
localhost:3000/rag
```

Use `m1.txt` for task generator model\
Use `m2.txt` for syntax generator model

## Performance testing

* First select the datasets for models
* Run pre-defined test for performance metrics.

```sh
yarn test
```

Use `--verbose` attribute for log the response of failed test runs.

#### Create new test case

Create a new test data files in `test/data` folder. \
Export the `userPrompt`, `systemPrompt` and `response` variables.\
Import them in `test/runner.js` and run with `await runTest('Test-Name', systemPrompt, userPrompt, response, verboseError);` 




