const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.delete('/api/producto/:id_producto/eliminar', async (req, res) => {
        try {
            const id_producto = req.params.id_producto;

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                await sql`
                    DELETE FROM
                        ordencompra
                    WHERE
                        id_producto = ${id_producto};
                `;

                await sql`
                    DELETE FROM
                        almacenamiento
                    WHERE
                        id_producto = ${id_producto};
                `;

                await sql`
                    DELETE FROM
                        producto
                    WHERE
                        id_producto = ${id_producto};
                `;

                return res.json({ ok: true });
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}