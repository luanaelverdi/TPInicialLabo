const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/productos/:id', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT * FROM 
                Productos
            WHERE
                id_producto = ${req.params.id};
        `);
        res.json(consulta[0]);
    });
}