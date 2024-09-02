const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.put('/api/compra/add/:id_producto/:id_deposito/:cantidad', async (req, res) => {
        const id_producto = req.params.id_producto;
        const cantidad = req.params.cantidad;
        const id_deposito = req.params.id_deposito;

        try {
            await db.query(`
                INSERT INTO
                    ordencompra (id_producto, cantidad, fecha_emision, id_deposito)
                VALUES (${id_producto}, ${cantidad},'${new Date().toISOString().split('T')[0]}',${id_deposito});
            `);

            await db.query(`
                UPDATE
                    almacenamiento
                SET
                    stock = stock + ${cantidad}
                WHERE
                    id_producto = ${id_producto} and id_deposito = ${id_deposito};
            `);

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}