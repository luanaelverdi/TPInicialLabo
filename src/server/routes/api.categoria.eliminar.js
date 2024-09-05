const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.delete('/api/categoria/:id_categoria/eliminar', async (req, res) => {
        try {
            const id_categoria = req.params.id_categoria;
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qStatus = await sql`
                    SELECT id_categoria FROM
                        producto
                    WHERE
                        id_categoria = ${id_categoria};
                `;
                if (qStatus[0]) return res.json({ ok: false, error: { message: "No se puede eliminar la categoria. Tiene productos asociados." } });

                await sql`
                    DELETE FROM
                        categoria
                    WHERE
                        id_categoria = ${id_categoria};
                `;
                
                return res.json({ ok: true });
            });;
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}