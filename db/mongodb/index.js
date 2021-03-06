const Mongoose = require('mongoose');
const config = require('../../config/cfg');
const fs = require('fs');
const join = require('path').join;
const modelsPath = join(__dirname +  '/model');

const startup = async () => {
    let mongoUri;

    mongoUri = config.mongodbUri;
    await Mongoose.connect(mongoUri, {
       poolSize: 50,
       keepAlive: true,
        useNewUrlParser: true
    });

    //loading models
    fs.readdirSync(modelsPath)
        .filter(file => ~file.search(/^[^\.].*\.js$/))
        .forEach(file => require(join(modelsPath, file)));


    const connection = Mongoose.connection;
    connection.on('error', console.error.bind(console, 'mongodb connection error: '));
    connection.on('disconnected', console.error.bind(console, 'mongodb disconnected: '));
    connection.on('connected', console.log.bind(console, 'mongodb connected'));
    connection.once('open', () => {
        console.log('mongodb connect successful : ' + mongoUri);
    });

    return connection;
}


module.exports = startup;
