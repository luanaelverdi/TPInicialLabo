const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.put('/api/compra/add/:id_producto/:cantidad', async (req, res) => {
        const id_producto = req.params.id_producto;
        const cantidad = req.params.cantidad;

        try {
            await db.query(`
                INSERT INTO
                    ordencompra (id_producto, cantidad, fecha_emision)
                VALUES (${id_producto}, ${cantidad},'${new Date().toISOString().split('T')[0]}');
            `);

            await db.query(`
                UPDATE
                    productos
                SET
                    stock = stock + ${cantidad}
                WHERE
                    id_producto = ${id_producto};
            `);

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}