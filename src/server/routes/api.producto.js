const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/producto/:id', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT * FROM 
                producto
            WHERE
                id_producto = ${req.params.id};
        `);
        res.json(consulta[0]);
    });
}