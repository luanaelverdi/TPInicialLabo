module.exports = (server) => {
    server.app.get('/api/credenciales', (_, res) => {
        const credenciales = { id: server.users.length + 1, qr: { id_producto: null } };
        server.users.push(credenciales);
        res.json({ credenciales });
    });
}