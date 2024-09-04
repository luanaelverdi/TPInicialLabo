const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.delete('/api/categoria/:id_categoria/eliminar', async (req, res) => {
        const id_categoria = req.params.id_categoria;

        try {
            const queryStatus = await db.query(`
                SELECT id_categoria FROM
                    producto
                WHERE
                    id_categoria = ${id_categoria};
            `);

            if (queryStatus != undefined && queryStatus != null && queryStatus != '' && queryStatus.length != 0) return res.json({ ok: false, error: { message: "No se puede eliminar la categoria. Tiene productos asociados." } });
            if (!queryStatus) return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });

            const eliminarCategoria = await db.query(`
                DELETE FROM
                    categoria
                WHERE
                    id_categoria = ${id_categoria};
            `);

            if (!eliminarCategoria) return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}