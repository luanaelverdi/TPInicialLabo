const Postgres = require('../Postgres.js');
module.exports = (server) => {
    server.app.post('/api/usuario/login', async (req, res) => {
        try {
            const nombre = req.body.nombre;
            const password = req.body.password;
            if (!nombre || nombre.length <= 0) throw new Error("Debes ingresar un nombre.");
            if (!password || password.length <= 0) throw new Error("Debes ingresar una contraseña.");

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                const qExisteUsuario = await sql`
                    SELECT * FROM usuario WHERE nombre_usuario = ${nombre};    
                `;
                if (!qExisteUsuario[0]) throw new Error("La contraseña/usuario es incorrecto.");
                if (password != qExisteUsuario[0].contraseña) throw new Error("La contraseña/usuario es incorrecto.");
                return res.json({
                    ok: true,
                    usuario: {
                        id_usuario: qExisteUsuario[0].id_usuario,
                        nombre_usuario: qExisteUsuario[0].nombre_usuario,
                        password_usuario: qExisteUsuario[0].contraseña
                    }
                });
            });
        } catch (err) {
            console.error(err);
            return res.json({ ok: false, error: { message: err.message || "Ha ocurrido un error." } });
        }
    });
}