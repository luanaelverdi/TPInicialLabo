const DBConnector = require('../dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/depositos', async (_, res) => {
        const consulta = await DBConnector.query("SELECT * from deposito");
        res.json(consulta);
    });
}