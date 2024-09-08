const request = require('supertest');
const express = require('express');

const productoRoute = require('../src/server/routes/api.producto.modificar'); 
const app = express();

app.use(express.json());
productoRoute({ app }); 

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
