const { OllamaEmbeddings } = require("@langchain/ollama");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { Ollama } = require("@langchain/ollama");

const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL
});

const ollamaLlm = new Ollama({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL
});

const vectorStore = Chroma.fromExistingCollection(
    ollamaEmbeddings,
    { collectionName: process.env.CHORMADB_COLLECTION , url: process.env.CHROMADB },
  );


module.exports = { 
    ollamaEmbeddings,
    ollamaLlm,
    vectorStore,
 }