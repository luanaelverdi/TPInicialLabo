//DBConnector = require('./dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/productos', (_, res) => {
        res.json({
            id: 1,
            name: "Producto 1",
            desc: "Soy un producto."
        });

 //   DBConnector.query("INSERT INTO Productos (codigo,nombre,descripcion,cant_stock,id_categoria) VALUES ('codigoPrueba','prueba','blabla',10,0)");

    });
}