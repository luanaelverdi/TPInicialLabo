module.exports = (server) => {
    server.app.get('/api/credenciales', (_, res) => {
        try {
            const credenciales = { id: server.users.length + 1, qr: { id_producto: null } };
            server.users.push(credenciales);
            res.json({ credenciales });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}