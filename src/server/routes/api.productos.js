const DBConnector = require('../dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/productos', async (_, res) => {
        const consulta = await DBConnector.query("SELECT * from Productos");
        res.json(consulta);
    });
}