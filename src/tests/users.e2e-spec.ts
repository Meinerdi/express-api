import request from 'supertest';

import { boot } from '../main';
import { App } from '../app';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

afterAll(() => {
	application.close();
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const result = await request(application.app)
			.post('/users/register')
			.send({ email: 'e2e@email.com', password: 'e2e' });

		expect(result.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'e2e@email.com', password: 'e2e' });

		expect(result.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'e2e@email.com', password: 'wrongPassword' });

		expect(result.body.jwt).toBeUndefined();
		expect(result.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'e2e@email.com', password: 'e2e' });

		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(result.body.email).toBe('e2e@email.com');
	});

	it('Info - error', async () => {
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer invalid`);

		expect(result.statusCode).toBe(401);
	});
});
