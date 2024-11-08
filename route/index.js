const ollamaRequestHandlerMW = require("../middleware/ollama/ollamaRequestHandlerMW");
const returnOllamaCallMW = require("../middleware/ollama/returnOllamaCallMW");
const { createProxyMiddleware } = require('http-proxy-middleware');

const getRAGDataSetsMW = require("../middleware/rag/getRAGDataSetsMW");
const loadRAGDataSetMW = require("../middleware/rag/loadRAGDataSetMW");
const applyRAGDataSetMW = require("../middleware/rag/applyRAGDataSetMW");
const renderMW = require("../middleware/renderMW");

module.exports = function (app) {
    app.post('/api/generate', ollamaRequestHandlerMW(), returnOllamaCallMW());

    app.get('/api/tags', createProxyMiddleware({
        target: process.env.OLLAMA,
        changeOrigin: true,
        
    }));

    app.use('/rag', getRAGDataSetsMW(), loadRAGDataSetMW(), applyRAGDataSetMW(), renderMW('rag'));
};