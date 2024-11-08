const { TextLoader } = require("langchain/document_loaders/fs/text");

module.exports = function () {

    return async function (req, res, next) {

            //Load the selected RAG data set
            //in request param 'ragDataSet' we have the name of the RAG data set
            //we will load the data set from the file system /data/'ragDataSets'/data.txt

            res.locals.dataSetName = req.body.dataSet;

            if (res.locals.dataSetName === undefined) {
                return next();
            }

            try{
                const path = `./data/${res.locals.dataSetName}/data.txt`;
                const loader = new TextLoader(path);
                res.dataDoc = await loader.load();
            } catch (error) {
                console.log(error);
                res.locals.status = "Error loading the selected RAG data set";
            }
            finally {
                return next();
            }
    }
};