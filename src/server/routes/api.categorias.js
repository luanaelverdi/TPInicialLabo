const DBConnector = require('../dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/categorias', async (_, res) => {
        const consulta = await DBConnector.query("SELECT * from categoria");
        res.json(consulta);
    });
}