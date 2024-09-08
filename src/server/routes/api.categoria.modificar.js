const Postgres = require('../Postgres.js');

module.exports = (server) => {
    server.app.post('/api/categoria/modificar', async (req, res) => {
        try {
            const categoria = req.body.categoria;
            if (categoria.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qCategoria = await sql`
                    SELECT * FROM categoria
                    WHERE id_categoria = ${categoria.id_categoria};
                `;
                if (!qCategoria[0]) throw new Error("Ha ocurrido un error.");
                await sql`
                    UPDATE
                        categoria
                    SET 
                        nombre = ${categoria.nombre}
                    WHERE
                        id_categoria = ${categoria.id_categoria};
                `;
            });
            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}