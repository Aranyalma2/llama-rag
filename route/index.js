module.exports = function (app) {
    app.post('/rag', generateRagMW());
};