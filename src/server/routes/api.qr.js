module.exports = (server) => {
    server.app.get('/api/qr/:id_usuario/:id_producto', (req, res) => {
        try {
            const id_usuario = req.params.id_usuario;
            const id_producto = req.params.id_producto;
            const credenciales = server.users.find(c => parseInt(c.id) === parseInt(id_usuario));
            if (!credenciales) return res.json({ ok: false })
            server.users = server.users.filter(c => parseInt(c.id) != parseInt(credenciales.id));
            const newCredentials = { id: credenciales.id, qr: { id_producto } };
            server.users.push(newCredentials);
            return res.json({ ok: true });    
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}