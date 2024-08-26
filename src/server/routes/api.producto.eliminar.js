const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.delete('/api/producto/:id_producto/eliminar', async (req, res) => {
        const id_producto = req.params.id_producto;

        try {
            await db.query(`
                DELETE FROM
                    ordencompra
                WHERE
                    id_producto = ${id_producto};
            `);

            await db.query(`
                DELETE FROM
                    productos
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