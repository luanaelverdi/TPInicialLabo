const db = require('../dbconnector.js');
module.exports = (server) => {
    server.app.post('/api/usuario/login', async (req, res) => {
        try {
            const nombre = req.body.nombre;
            const password = req.body.password;
            if (!nombre || nombre.length <= 0) throw new Error("Debes ingresar un nombre.");
            if (!password || password.length <= 0) throw new Error("Debes ingresar una contraseña.");
            const consultaExisteUsuario = await db.query(`
                SELECT * FROM usuario WHERE nombre_usuario = '${nombre}';
            `);
            if (!consultaExisteUsuario || !consultaExisteUsuario[0]) throw new Error("No existe tal usuario.");
            if (password != consultaExisteUsuario[0].contraseña) throw new Error("La contraseña es incorrecta.");
            return res.json({
                ok: true,
                usuario: {
                    id_usuario: consultaExisteUsuario[0].id_usuario,
                    nombre_usuario: consultaExisteUsuario[0].nombre_usuario,
                    password_usuario: consultaExisteUsuario[0].contraseña
                }
            });
        } catch (err) {
            console.error(err);
            return res.json({ ok: false, error: { message: err.message || "Ha ocurrido un error." } });
        }
    });
}