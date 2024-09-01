const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/categoria/:id', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT * FROM 
                categoria
            WHERE
                id_categoria = ${req.params.id};
        `);
        res.json(consulta[0]);
    });
}