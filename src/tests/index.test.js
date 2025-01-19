const http = require('http');

const BASE_URL = 'http://127.0.0.1:3000';

describe('API Tests', () => {
	const makeRequest = (path) => {
		return new Promise((resolve, reject) => {
			http
				.get(`${BASE_URL}${path}`, (res) => {
					let data = '';
					res.on('data', (chunk) => (data += chunk));
					res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
				})
				.on('error', (err) => reject(err));
		});
	};

	let server;
	beforeAll(() => {
		server = require('../index');
	});

	afterAll((done) => {
		server.close(done);
	});

	test('GET / should return "Hello World"', async () => {
		const response = await makeRequest('/');
		expect(response.status).toBe(200);
		expect(response.data).toEqual({ message: 'Hello World' });
	});

	test('GET /health should return server health status', async () => {
		const response = await makeRequest('/health');
		expect(response.status).toBe(200);
		expect(response.data).toHaveProperty('status', 'ok');
		expect(response.data).toHaveProperty('uptime');
		expect(typeof response.data.uptime).toBe('number');
	});

	test('GET /sum?a=5&b=3 should return the sum of 5 and 3', async () => {
		const response = await makeRequest('/sum?a=5&b=3');
		expect(response.status).toBe(200);
		expect(response.data).toEqual({ result: 8 });
	});

	test('GET /sum?a=10&b=-2 should return the sum of 10 and -2', async () => {
		const response = await makeRequest('/sum?a=10&b=-2');
		expect(response.status).toBe(200);
		expect(response.data).toEqual({ result: 8 });
	});

	test('GET /error should simulate a server error', async () => {
		const response = await makeRequest('/error');
		expect(response.status).toBe(500);
		expect(response.data).toEqual({ error: 'This is a forced error' });
	});

	test('GET /unknown should return a 404 error', async () => {
		const response = await makeRequest('/unknown');
		expect(response.status).toBe(404);
		expect(response.data).toEqual({ error: 'Not Found' });
	});
});
