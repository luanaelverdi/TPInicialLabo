const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.delete('/api/producto/:id_producto/deposito/:id_deposito/restar/:cantidad', async (req, res) => {
        try {
            const id_producto = req.params.id_producto;
            const cantidad = req.params.cantidad;
            const id_deposito = req.params.id_deposito;

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qStockMinimo = await sql`
                    SELECT stock_minimo
                    FROM producto
                    WHERE id_producto = ${id_producto};
                `;
                const qStock = await sql`
                    SELECT stock
                    FROM almacenamiento
                    WHERE id_producto = ${id_producto} and id_deposito = ${id_deposito};
                `;
                if ((qStock[0].stock - cantidad) <= qStockMinimo[0].stock_minimo) {
                    return res.json({ ok: false, error: { code: "limite", message: "Se llego al stock minimo." } });
                }

                await sql`
                    UPDATE
                        almacenamiento
                    SET
                        stock = stock - ${cantidad}
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