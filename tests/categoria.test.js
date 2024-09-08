const request = require('supertest');
const express = require('express');

const categoriaAddRoute = require('../src/server/routes/api.categoria.add'); // Ajusta la ruta a tu archivo real
const app = express();

app.use(express.json());
categoriaAddRoute({ app });

describe('POST /api/categoria/agregar', () => {

  it('debería devolver un error si el nombre de la categoría está vacío', async () => {
    const response = await request(app)
      .post('/api/categoria/agregar')
      .send({
        categoria: { nombre: '' }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un nombre.");
  });
});

const categoriaModificarRoute = require('../src/server/routes/api.categoria.modificar');

categoriaModificarRoute({ app });

describe('POST /api/categoria/modificar', () => {

  it('debería devolver un error si el nombre de la categoría está vacío', async () => {
    const response = await request(app)

      .post('/api/categoria/modificar')
      .send({
        categoria: { nombre: '' }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un nombre.");
  });
});