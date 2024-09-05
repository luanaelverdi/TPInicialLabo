const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.post('/api/categoria/agregar', async (req, res) => {
        try {
            const categoria = req.body.categoria;
            if (categoria.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });

            await Postgres.query().begin(async sql => {
                await sql`
                    INSERT INTO 
                        categoria (nombre) 
                    VALUES (
                        ${categoria.nombre}
                    );
                `;

                return res.json({ ok: true });
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}