const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.post('/api/usuario/registro', async (req, res) => {
        try {
            const nombre = req.body.nombre;
            const password = req.body.password;
            if (!nombre || nombre.length <= 0) throw new Error("Debes ingresar un nombre.");
            if (!password || password.length <= 0) throw new Error("Debes ingresar una contraseña.");
            const existeUsuario = await db.query(`
                SELECT * FROM usuario WHERE nombre_usuario = '${nombre}';
            `);
            if (existeUsuario[0]) throw new Error("Ya existe un usuario con ese nombre.");
            const consultaInsertarUsuario = db.query(`
                INSERT INTO
                    usuario (nombre_usuario, contraseña)
                VALUES ('${nombre}', ${password});
            `);
            if (!consultaInsertarUsuario) throw new Error("Ha ocurrido un error.");
            return res.json({ ok: true });
        } catch (err) {
            console.error(err);
            return res.json({ ok: false, error: { message: err.message || "Ha ocurrido un error." } });
        }
    });
}