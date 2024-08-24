module.exports = (server) => {
    server.app.get('/api/productos', (_, res) => {
        res.json({
            id: 1,
            name: "Producto 1",
            desc: "Soy un producto."
        });
    });
}