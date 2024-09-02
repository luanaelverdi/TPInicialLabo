const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.post('/api/categoria/agregar', async (req, res) => {
        const categoria = req.body.categoria;

        if (categoria.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });

        try {
            const queryStatus = await db.query(`
                INSERT INTO 
                    categoria (nombre) 
                VALUES (
                    "${categoria.nombre}"
                );
            `);

            if (!queryStatus) return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });

        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }

        return res.json({ ok: true });
    });
}