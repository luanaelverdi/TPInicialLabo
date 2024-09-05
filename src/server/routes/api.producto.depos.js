const DBConnector = require("../dbconnector.js");
const Postgres=require("../Postgres.js");

module.exports = (server) => {
    server.app.get('/api/producto/:id/depositos', async (req, res) => {
        try {
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const q = await sql`
                    SELECT a.id_producto, a.id_deposito, a.stock, d.nombre FROM 
                        almacenamiento a, deposito d
                    WHERE
                        a.id_producto = ${req.params.id} and d.id_deposito = a.id_deposito;    
                `;
                return res.json(q);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}