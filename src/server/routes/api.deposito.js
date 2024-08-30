const DBConnector = require("../dbconnector.js");

module.exports = (server) => {
    server.app.get('/api/deposito/:id', async (req, res) => {
        const consulta = await DBConnector.query(`
            SELECT * FROM 
                deposito
            WHERE
                id_deposito = ${req.params.id};
        `);
        res.json(consulta[0]);
    });
}