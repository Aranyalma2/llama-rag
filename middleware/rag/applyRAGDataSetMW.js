const MemoryService = require('../../ai/memoryService');
const { modelSyntax, modelSyntaxEmbeddings } = require("../../ai/models");
const { memoryServiceInstance, setMemoryServiceInstance } = require("../../ai/msContainer");

module.exports = function () {

    return async function (req, res, next) {

        //Create a memory service and store the data
        console.log(res.dataDoc);
        if(res.dataDoc === undefined){
            return next();
        }
        try {
            setMemoryServiceInstance(new MemoryService(modelSyntax, modelSyntaxEmbeddings), res.locals.dataSetName);
            await memoryServiceInstance.service.storeMemory(res.dataDoc);
            res.locals.status = "Memory stored successfully";
        } catch (error) {
            console.log(error);
            res.locals.status = "Error storing memory";
        } finally {
            return next();
        }
    }
};