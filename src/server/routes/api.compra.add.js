const Postgres = require('../Postgres.js');

module.exports = (server) => {
    server.app.put('/api/compra/add/:id_producto/:id_deposito/:cantidad', async (req, res) => {
        try {
            const id_producto = req.params.id_producto;
            const cantidad = req.params.cantidad;
            const id_deposito = req.params.id_deposito;

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED`;
                await sql`
                    INSERT INTO
                        ordencompra (id_producto, cantidad, fecha_emision, id_deposito)
                    VALUES (${id_producto}, ${cantidad}, ${new Date().toISOString()}, ${id_deposito});
                `;
                await sql`
                    UPDATE
                        almacenamiento
                    SET
                        stock = stock + ${cantidad}
                    WHERE
                        id_producto = ${id_producto} and id_deposito = ${id_deposito};
                `;

                return res.json({ ok: true });
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}