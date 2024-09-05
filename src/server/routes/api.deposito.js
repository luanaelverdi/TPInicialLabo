const Postgres=require("../Postgres.js");

module.exports = (server) => {
    server.app.get('/api/deposito/:id', async (req, res) => {
        try {
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const q = await sql`
                    SELECT * FROM 
                        deposito
                    WHERE
                        id_deposito = ${req.params.id};
                `;
                return res.json(q[0]);
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}