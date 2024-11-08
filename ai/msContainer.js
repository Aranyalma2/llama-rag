const MemoryService = require('./memoryService');
const { modelSyntax, modelSyntaxEmbeddings } = require("./models");

let memoryServiceInstance = {
    service: new MemoryService(modelSyntax, modelSyntaxEmbeddings),
    name: "none"
};

function setMemoryServiceInstance(instance, name){
    memoryServiceInstance.service = instance;
    memoryServiceInstance.name = name;
}

module.exports = { memoryServiceInstance, setMemoryServiceInstance };