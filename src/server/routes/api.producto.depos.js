const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/producto/:id/depositos', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT * FROM 
                almacenamiento a
            WHERE
                a.id_producto = ${req.params.id};
        `);
        res.json(consulta);
    });
}