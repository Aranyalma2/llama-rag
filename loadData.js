import {OllamaEmbeddings} from "@langchain/ollama"
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


//Get an instance of ollama embeddings
const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:process.env.OLLAMA,
    model:process.env.MODEL
});


//Load data from txt file
const loader = new TextLoader("./data/data.txt");
const docs = await loader.load();

//Create a text splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:1000,
    separators: ['\n\n','\n',' ',''],
    chunkOverlap: 200
});

//Split the text and get Document list as response
const output = await splitter.splitDocuments(docs);

//Creat embeddings and push it to collection
const vectorStore = await Chroma.fromDocuments(output, ollamaEmbeddings, {
    collectionName: process.env.CHROMADB_COLLECTION,
    url: process.env.CHROMADB, // Optional, will default to this value
});