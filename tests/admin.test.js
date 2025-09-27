import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import server from '../server.js';


const adminCreds = { email: 'admin@example.com', password: 'admin', role: 'admin' };
let adminToken;


test('Admin login returns token', async () => {
    const res = await request(server.app)
        .post('/api/admin/login')
        .send(adminCreds);
    console.log(res.body);
    assert.strictEqual(res.statusCode, 200);
    adminToken = res.body.data.token;
});


test('GET /api/admin/listing-user → protected listing', async () => {
    const res = await request(server.app)
        .get('/api/admin/listing-user')
        .set('Authorization', `Bearer ${adminToken}`);
    console.log(res.body);

    assert.strictEqual(res.statusCode, 200);
    assert.ok(Array.isArray(res.body.data));
});