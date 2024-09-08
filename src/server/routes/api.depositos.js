const Postgres = require('../Postgres.js');

module.exports = (server) => {
    server.app.get('/api/depositos', async (_, res) => {
        try {
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const q = await sql`SELECT * FROM deposito;`;
                return res.json(q);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}