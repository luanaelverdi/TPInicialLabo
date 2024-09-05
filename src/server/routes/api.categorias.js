const DBConnector = require('../dbconnector.js');
const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.get('/api/categorias', async (_, res) => {
        try {
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qCategorias = await sql`SELECT * FROM categoria;`;
                return res.json(qCategorias);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}