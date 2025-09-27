import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import server from '../server.js';


const userPayload = {
    username: 'user1',
    email: 'user1@example.com',
    password: 'secret123',
    confirmPassword: 'secret123'
};


let token;


test('POST /api/user/auth/register → success', async () => {
    const res = await request(server.app)
        .post('/api/user/auth/register')
        .send(userPayload)
        .set('Accept', 'application/json');
    console.log(res.body);
    assert.strictEqual(res.statusCode, 200);
});


test('POST /api/user/auth/login → success returns JWT', async () => {
    const res = await request(server.app)
        .post('/api/user/auth/login')
        .send({ email: userPayload.email, password: userPayload.password })
        .set('Accept', 'application/json');
    console.log(res.body);
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.data.token);
    token = res.body.token;
});