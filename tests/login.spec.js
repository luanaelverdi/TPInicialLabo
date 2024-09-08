//const login = require('../src/server/routes/api.usuario.login.js');
const login = require('../src/public/views/LoginView');
const request = require('supertest');

//esta buscando esa ruta y no la tiene que encontrar
describe('POST /api/usuario/login', () => {

    test('should response with a 200 status code', async () => {
        const response = await request(login).post('/api/usuario/login').send()
        console.log(response)
        //expect(response.statusCode).toBe(200);
    })
})