const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const routes = {
	'/': (req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ message: 'Hello World' }));
	},
	'/health': (req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
	},
	'/sum': (req, res) => {
		const query = url.parse(req.url, true).query;
		const a = parseFloat(query.a) || 0;
		const b = parseFloat(query.b) || 0;
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ result: a + b }));
	},
	'/error': (req, res) => {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'This is a forced error' }));
	}
};

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const routeHandler =
		routes[parsedUrl.pathname] ||
		(() => {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ error: 'Not Found' }));
		});
	routeHandler(req, res);
});

if (require.main === module) {
	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});
}

module.exports = server;
