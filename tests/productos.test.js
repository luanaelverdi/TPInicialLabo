const request = require('supertest');
const express = require('express');

const productoAddRoute = require('../src/server/routes/api.producto.add');
const app = express();

app.use(express.json());
productoAddRoute({ app });

describe('POST /api/producto/add', () => {

  it('debería devolver un error si el código del producto está vacío', async () => {
    const response = await request(app)
      .post('/api/producto/add')
      .send({
        producto: { codigo: '', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [1], stockActual: 20 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un codigo.");
  });

  it('debería devolver un error si el nombre del producto está vacío', async () => {
    const response = await request(app)
      .post('/api/producto/add')
      .send({
        producto: { codigo: '123', nombre: '', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [1], stockActual: 20 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un nombre.");
  });

  it('debería devolver un error si el stock mínimo es negativo', async () => {
    const response = await request(app)
      .post('/api/producto/add')
      .send({
        producto: { codigo: '123', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: -5, id_categoria: 1, depositos: [1], stockActual: 20 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un stock minimo valido.");
  });

  it('debería devolver un error si no hay depósitos asociados', async () => {
    const response = await request(app)
      .post('/api/producto/add')
      .send({
        producto: { codigo: '123', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [], stockActual: 20 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un deposito.");
  });

  it('debería devolver un error si el stock actual es menor o igual a 0', async () => {
    const response = await request(app)
      .post('/api/producto/add')
      .send({
        producto: { codigo: '123', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [1], stockActual: 0 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("El stock actual debe ser mayor a 0.");
  });

});

///////modificar
const productoModificarRoute = require('../src/server/routes/api.producto.modificar'); 
productoModificarRoute({ app }); 

describe('POST /api/producto/modificar', () => {

  it('debería devolver un error si el código del producto está vacío', async () => {
    const response = await request(app)
      .post('/api/producto/modificar')
      .send({
        producto: { codigo: '', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [1], id_producto: 123 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un codigo.");
  });

  it('debería devolver un error si el nombre del producto está vacío', async () => {
    const response = await request(app)
      .post('/api/producto/modificar')
      .send({
        producto: { codigo: '123', nombre: '', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [1], id_producto: 123 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un nombre.");
  });

  it('debería devolver un error si el stock mínimo es negativo', async () => {
    const response = await request(app)
      .post('/api/producto/modificar')
      .send({
        producto: { codigo: '123', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: -5, id_categoria: 1, depositos: [1], id_producto: 123 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un stock minimo valido.");
  });

  it('debería devolver un error si no hay depósitos seleccionados', async () => {
    const response = await request(app)
      .post('/api/producto/modificar')
      .send({
        producto: { codigo: '123', nombre: 'Producto1', descripcion: 'Descripcion1', stock_minimo: 10, id_categoria: 1, depositos: [], id_producto: 123 }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes seleccionar un deposito.");
  });
});
