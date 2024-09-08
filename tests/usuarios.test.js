const request = require('supertest');
const express = require('express');

const loginRoute = require('../src/server/routes/api.usuario.login');
const app = express();

app.use(express.json());
loginRoute({ app });

describe('POST /api/usuario/login', () => {

  test('debería devolver un error si no se proporciona nombre', async () => {
    const response = await request(app)
      .post('/api/usuario/login')
      .send({ password: '1234' });

    expect(response.statusCode).toBe(200); 
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe('Debes ingresar un nombre.');
  });

  test('debería devolver un error si no se proporciona password', async () => {
    const response = await request(app)
      .post('/api/usuario/login')
      .send({ nombre: 'usuario' });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe('Debes ingresar una contraseña.');
  });
});

/////registro
const registroRoute = require('../src/server/routes/api.usuario.registro');
registroRoute({ app }); 

describe('POST /api/usuario/registro', () => {
  it('debería devolver un error si el nombre está vacío', async () => {
    const response = await request(app)
      .post('/api/usuario/registro')
      .send({ nombre: '', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar un nombre.");
  });

  it('debería devolver un error si la contraseña está vacía', async () => {
    const response = await request(app)
      .post('/api/usuario/registro')
      .send({ nombre: 'UsuarioTest', password: '' });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.message).toBe("Debes ingresar una contraseña.");
  });
});

