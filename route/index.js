const ollamaRequestHandlerMW = require("../middleware/ollamaRequestHandlerMW");
const returnOllamaCallMW = require("../middleware/returnOllamaCallMW");
const { createProxyMiddleware } = require('http-proxy-middleware');

const { vectorStore } = require('../middleware/global');

module.exports = function (app) {
    app.post('/api/generate', ollamaRequestHandlerMW(), returnOllamaCallMW());

    app.get('/api/tags', createProxyMiddleware({
        target: process.env.OLLAMA,
        changeOrigin: true,
        
    }));

    app.get('/api/cleardb', async (req, res) => {
    try {
        res.status(501).send({ message: 'ChromaDB collection clear not implemented yet.' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to clear ChromaDB collection.', error: error.message });
    }
});
};