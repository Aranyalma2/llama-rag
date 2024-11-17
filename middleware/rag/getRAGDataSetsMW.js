const fs = require('fs');
const { getGlobalMemoryServiceContainer } = require("../../ai/msContainer");

module.exports = function () {

    return async function (req, res, next) {

        //Read up the folders name from /data and send it to the client in a string array
        try {
            const path = './data';
            const dataSets = fs.readdirSync(path);
            res.locals.dataSets = dataSets;

            res.locals.dataSetName = getGlobalMemoryServiceContainer().getName();
        } catch (error) {
            console.log(error);
            res.locals.status = "Error loading RAG data sets from file system";
        } finally {
            return next();
        }        
    }
};