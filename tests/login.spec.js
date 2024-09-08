//const login = require('../src/server/routes/api.usuario.login.js');
const login = require('../src/public/views/LoginView');
const request = require('supertest');

describe('GET /tasks', () => {

    test('should response with a 200 status code', async () => {
        const response = await request(login).get('/tasks').send()
        console.log(response)
    })
})