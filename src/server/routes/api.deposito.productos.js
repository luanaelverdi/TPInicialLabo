const Postgres = require('../Postgres.js');

module.exports = (server) => {
    server.app.get('/api/depositos/:id_deposito/productos', async (req, res) => {
        try {
            const id_deposito = req.params.id_deposito;
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const q = await sql`
                    SELECT 
                        d.id_deposito, d.nombre, p.id_producto, p.nombre_producto, a.stock
                    FROM
                        deposito d, almacenamiento a, producto p
                    WHERE
                        d.id_deposito = ${id_deposito} and a.id_deposito = ${id_deposito} and p.id_producto = a.id_producto;
                `;
                return res.json(q);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}