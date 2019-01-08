
const config = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGO_URI || 'mongodb://localhost/btc-gateway',
};


module.exports = config;