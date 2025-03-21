require('dotenv').config();

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const env = require('../src/environment/env');

const dev = env.nodeEnv !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = env.port;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
