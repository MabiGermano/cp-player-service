const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const routes = require('./routes');

const app = express();
app.use(routes);
app.use(cors);

const server = http.createServer(app);
const io = socketIO(server);

app.listen(3333);