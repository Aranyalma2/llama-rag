const MemoryService = require('../../ai/memoryService');
const { modelTask, modelTaskEmbeddings, modelSyntax, modelSyntaxEmbeddings } = require("../../ai/models");
const { getGlobalMemoryServiceContainer, createGlobalMemoryServiceContainer } = require("../../ai/msContainer");

module.exports = function () {

    return async function (req, res, next) {

        //Create a memory service and store the data
        if(res.dataM1 === undefined || res.dataM2 === undefined){
            return next();
        }
        try {
            createGlobalMemoryServiceContainer(res.locals.dataSetName);

            const ms1 = new MemoryService(modelTask, modelTaskEmbeddings);
            const ms2 = new MemoryService(modelSyntax, modelSyntaxEmbeddings);

            await ms1.storeMemory(res.dataM1);
            await ms2.storeMemory(res.dataM2);
            
            getGlobalMemoryServiceContainer().addInstance('model1', ms1);
            getGlobalMemoryServiceContainer().addInstance('model2', ms2);

            res.locals.status = "Memory stored successfully";
        } catch (error) {
            console.log(error);
            res.locals.status = "Error storing memory";
        } finally {
            return next();
        }
    }
};