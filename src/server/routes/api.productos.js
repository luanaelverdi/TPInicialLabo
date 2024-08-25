DBConnector = require('./../dbconnector.js');

module.exports = (server) => {
    server.app.get('/api/productos', async (_, res) => {
        const consulta = await DBConnector.query("SELECT * from Productos") 
        res.json(consulta.map(p => {
            return {
                id: p.idProducto + "",
                nombre: p.nombre
            }
        }));
  //  DBConnector.query("INSERT INTO Productos (codigo,nombre,descripcion,cant_stock,id_categoria) VALUES ('codigoPrueba','prueba','blabla',10,0)");

    });
}