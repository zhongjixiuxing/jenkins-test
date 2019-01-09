

const apiPrefix = '/v1';
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({name: 'anxing', method: 'post'});
    });

    app.post('/', (req, res) => {
        res.json({name: 'anxing', method: 'post'})
    })
}