const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const routes = require('./routes');

const app = express();
app.use(cors);
app.use(routes);

const server = http.createServer(app);
const io = socketIO(
    server,
    {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    }
);

let interval;
io.on('connection', (socket) => {
    console.log('New client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit('FromAPI', response);
};

server.listen(3333, () => console.log(`Listening on port 3333`));
