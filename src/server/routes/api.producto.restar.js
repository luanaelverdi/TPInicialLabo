const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.delete('/api/producto/:id_producto/deposito/:id_deposito/restar/:cantidad', async (req, res) => {
        const id_producto = req.params.id_producto;
        const cantidad = req.params.cantidad;
        const id_deposito = req.params.id_deposito;

        try {
            const consultaStockMinimo = await db.query(`
                SELECT stock_minimo
                FROM producto
                WHERE id_producto = ${id_producto};
            `);
            const consultaStock = await db.query(`
                SELECT stock
                FROM almacenamiento
                WHERE id_producto = ${id_producto} and id_deposito = ${id_deposito};
            `);

            if ((consultaStock[0].stock - cantidad) <= consultaStockMinimo[0].stock_minimo) {
                return res.json({ ok: false, error: { code: "limite", message: "Se llego al stock minimo." } });
            }

            await db.query(`
                UPDATE
                    almacenamiento
                SET
                    stock = stock - ${cantidad}
                WHERE
                    id_producto = ${id_producto} and id_deposito = ${id_deposito};
            `);

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}