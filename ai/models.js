const {ChatOllama, OllamaEmbeddings} = require("@langchain/ollama");

const modelTask = new ChatOllama({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL_TASK_GENERATOR
});

const modelTaskEmbeddings = new OllamaEmbeddings({
    baseUrl:process.env.OLLAMA,
    model:process.env.EMBEDDING_MODEL_TASK
});

const modelSyntax = new ChatOllama({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL_SYNTAX_GENERATOR
});

const modelSyntaxEmbeddings = new OllamaEmbeddings({
    baseUrl:process.env.OLLAMA,
    model:process.env.EMBEDDING_MODEL_SYNTAX
});


module.exports = { 
    modelTask,
    modelTaskEmbeddings,
    modelSyntax,
    modelSyntaxEmbeddings
 }