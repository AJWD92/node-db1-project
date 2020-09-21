const express = require("express");

const accountsRouters = require('../routes/accounts.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouters);


module.exports = server;
