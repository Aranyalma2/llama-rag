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
                const path1 = `./data/${res.locals.dataSetName}/m1.txt`;
                const loader1 = new TextLoader(path1);
                res.dataM1 = await loader1.load();

                const path2 = `./data/${res.locals.dataSetName}/m2.txt`;
                const loader2 = new TextLoader(path2);
                res.dataM2 = await loader2.load();
            } catch (error) {
                console.log(error);
                res.locals.status = "Error loading the selected RAG data set";
            }
            finally {
                return next();
            }
    }
};