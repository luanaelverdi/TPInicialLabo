const DBConnector = require('../dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/depositos/:id_deposito/productos', async (req, res) => {
        const id_deposito = req.params.id_deposito;

        const consulta = await DBConnector.query(
            `SELECT 
                d.id_deposito,d.nombre,p.id_producto,p.nombre_producto,a.stock
            FROM
                deposito d, almacenamiento a,producto p
            WHERE
                d.id_deposito = ${id_deposito} and a.id_deposito = ${id_deposito} and p.id_producto = a.id_producto;
            `
        );
        res.json(consulta);
    });
}