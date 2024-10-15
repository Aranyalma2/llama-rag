module.exports = function () {

    return async function (req, res, next) {
        try {

            const responseTxt = res.ollamaResponse;

            res.status(200).json({
                model: process.env.MODEL,
                created_at: new Date().toISOString(),
                response: responseTxt,
                done: true
            });

            } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
};