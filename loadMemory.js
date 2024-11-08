const { MultiFileLoader } = require("langchain/document_loaders/fs/multi_file");
const { JSONLoader } = require("langchain/document_loaders/fs/json");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { ollamaEmbeddings } = require('./ai/models.js');


const loader = new MultiFileLoader(
  [
    "data/data.txt",
    "data/devices.json",
  ],
  {
    ".json": (path) => new JSONLoader(path),
    ".txt": (path) => new TextLoader(path),
  }
);

const loadVectorStore = async () => {

const data = await loader.load();

//Create a text splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:500,
    separators: ['\n\n','\n',' ',''],
    chunkOverlap: 20
});

const splitDocs = await splitter.splitDocuments(data);

// Then use the TensorFlow Embedding to store these chunks in the datastore
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, ollamaEmbeddings);

return vectorStore;

}

module.exports = { loadVectorStore };