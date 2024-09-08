const Postgres = require("../Postgres.js");

module.exports = (server) => {
    server.app.get('/api/categoria/:id', async (req, res) => {
        try {
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qCategorias = await sql`
                    SELECT * FROM 
                        categoria
                    WHERE
                        id_categoria = ${req.params.id};
                `;
                return res.json(qCategorias);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}