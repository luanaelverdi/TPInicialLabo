const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.delete('/api/producto/:id_producto/restar/:cantidad', async (req, res) => {
        const id_producto = req.params.id_producto;
        const cantidad = req.params.cantidad;

        try {
            const consultaStock = await db.query(`
                SELECT stock, stock_minimo
                FROM producto
                WHERE id_producto = ${id_producto};
            `);

            if (consultaStock[0].stock <= consultaStock[0].stock_minimo) {
                // hacer lo de la orden
                return res.json({ ok: false, error: { code: "limite", message: "Se llego al stock minimo." } });
            }

            await db.query(`
                UPDATE
                    producto
                SET
                    stock = stock - ${cantidad}
                WHERE
                    id_producto = ${id_producto};
            `);

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}