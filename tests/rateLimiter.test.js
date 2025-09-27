import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import server from '../server.js';


const creds = { email: 'user1@example.com', password: 'wrongpass' };


test('Rate limiter blocks after 5 failed login attempts', async () => {
    for (let i = 0; i < 5; i++) {
        await request(server.app).post('/api/user/auth/login').send(creds);
    }
    const res = await request(server.app).post('/api/user/auth/login').send(creds);
    console.log(res.body);

    assert.strictEqual(res.statusCode, 429);
    assert.ok(res.body.message.includes('Too many login attempts'));
});