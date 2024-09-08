const Postgres = require('../Postgres.js');

module.exports = (server) => {
    server.app.post('/api/usuario/registro', async (req, res) => {
        try {
            const nombre = req.body.nombre;
            const password = req.body.password;
            if (!nombre || nombre.length <= 0) throw new Error("Debes ingresar un nombre.");
            if (!password || password.length <= 0) throw new Error("Debes ingresar una contraseña.");
            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qExisteUsuario = await sql`SELECT * FROM usuario WHERE nombre_usuario = ${nombre};`;
                if (qExisteUsuario[0]) throw new Error("Ya existe un usuario con ese nombre.");
                await sql`
                    INSERT INTO
                        usuario (nombre_usuario, contraseña)
                    VALUES (${nombre}, ${password});
                `;
                return res.json({ ok: true });
            });
        } catch (err) {
            console.error(err);
            return res.json({ ok: false, error: { message: err.message || "Ha ocurrido un error." } });
        }
    });
}