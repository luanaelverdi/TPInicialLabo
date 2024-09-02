const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.post('/api/categoria/modificar', async (req, res) => {
        const categoria = req.body.categoria;

        if (categoria.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });

        try {
            const queryStatus = await db.query(`
                UPDATE
                    categoria
                SET 
                    nombre = "${categoria.nombre}"
                WHERE
                    id_categoria = ${categoria.id_categoria};
            `);

            if (!queryStatus) return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });

        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }

        return res.json({ ok: true });
    });
}