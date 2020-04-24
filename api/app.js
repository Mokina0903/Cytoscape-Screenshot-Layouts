const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const layoutRouter = require('./routes/layout');

const server = express();

server.use(cors());
server.use('/layout', layoutRouter);

server.get('/', function (req, res) {
  res.send("Hello World!");
});

const sslOptions = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem'),
  //passphrase: ""
};

//http.createServer(server).listen(8000);
https.createServer(sslOptions, server).listen(8444);

module.exports = server;
