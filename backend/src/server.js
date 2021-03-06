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
    server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }
);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('PlayerAction', (action) => {
        console.log('ação feita');
        socket.broadcast.emit('SetTune', action);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(3333, () => console.log(`Listening on port 3333`));