const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const PORT = 8683;

module.exports.getLocalhostURL = () => {
  return `http://localhost:${PORT}/`;
};

module.exports.getURL = () => {
  return `http://${os.hostname()}:${PORT}/`;
};

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static(path.join(__dirname, 'web-app', 'dist')));

let server;
const donePromise = new Promise(resolve => {
  server = app.listen(PORT, () => {
    console.log(`Web server listening at http://localhost:${PORT}`);
    resolve();
  });
});

module.exports.onReady = donePromise.then.bind(donePromise);

module.exports.close = () => {
  donePromise.then(() => server.close());
};