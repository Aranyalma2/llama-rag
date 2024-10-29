const { OllamaEmbeddings } = require("@langchain/ollama");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { Ollama } = require("@langchain/ollama");

const home3bEmbeddings = new OllamaEmbeddings({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL_HOME3B
});

const llama = new Ollama({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL_LLAMA
});

const home3b = new Ollama({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL_HOME3B
});

const vectorStore = Chroma.fromExistingCollection(
    home3bEmbeddings,
    { collectionName: process.env.CHORMADB_COLLECTION , url: process.env.CHROMADB },
  );


module.exports = { 
    home3bEmbeddings,
    home3b,
    llama,
    vectorStore,
 }