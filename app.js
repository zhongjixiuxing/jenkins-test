const express = require('express');
const startupMongo = require('./db/mongodb/index')
const cors = require('cors');
const app = express();
const config = require('./config/cfg')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initial router
require('./src/router/index')(app);

// error handler
app.use(function(err, req, res, next) {
    console.error('application intenel error : ', err);
    // set locals, only providing error in development
    res.locals.message = err.message;

    // render the error page/,
    res.status(err.status || 500);
    res.json({err: 'ServerError'});
});

(async () => {
    // await startupMongo();

    /**
     * Get port from environment and store in Express.
     */
    app.set('port', config.port);

    app.listen(config.port);
})()

module.exports = app;