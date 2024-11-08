const { VectorDBQAChain } = require("langchain/chains");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

module.exports = class MemoryService {
    constructor(llmModel, embeddingsModel) {
        this.llmModel = llmModel;
        this.embeddingsModel = embeddingsModel;

        // create vector store by combining OpenSearch store with the embeddings model
        this.vectorStore = new MemoryVectorStore(this.embeddingsModel);

        // combine the LLM model and the vector store to get a chain
        this.chain = VectorDBQAChain.fromLLM(this.llmModel, this.vectorStore, {
            k: 1,
            returnSourceDocuments: true,
        });
    }

    async storeMemory(data) {
        
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize:500,
            separators: ['\n\n','\n',' ',''],
            chunkOverlap: 20
        });

        const splitDocs = await splitter.splitDocuments(data);

        await this.vectorStore.addDocuments(splitDocs);

        console.log('Document indexed successfully:', splitDocs);
    }

    async getRelevantMemory(query) {
        const response = await this.chain.call({query});
        return response.text;
    }
}