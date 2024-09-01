const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/producto/:id/depositos', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT a.id_producto, a.id_deposito, a.stock, d.nombre FROM 
                almacenamiento a, deposito d
            WHERE
                a.id_producto = ${req.params.id} and d.id_deposito = a.id_deposito;
        `);
        res.json(consulta);
    });
}