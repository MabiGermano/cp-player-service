const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const routes = require("./routes");
const events = require("./models/Events");

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  const room = socket.request._query.id;
  socket.join(room);

  socket.on("PlayerAction", (data) => {
    const { roomId, action } = data;
    console.log("ação feita");
    socket.to(roomId).emit("SetTune", action);
  });

  socket.on("NextVideo", (data) => {
    const { roomId, action } = data;

    axios.get(`http://127.0.0.1:3334/${roomId}/playlist/next-video`)
    .then(playlist => {
        socket.to(roomId).emit("UpdateVideo", playlist);
    })
    
  });

  socket.on("PreviousVideo", (data) => {
    const { roomId, action } = data;
    axios.get(`http://127.0.0.1:3334/${roomId}/playlist/previous-video`)
    .then(playlist => {
        socket.to(roomId).emit("UpdateVideo", playlist);
    })
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

exports.emitEvent = function (roomIdentifier, data) {
  io.to(roomIdentifier).emit("UpdatePlaylist", data);
};

server.listen(3333, () => console.log(`Listening on port 3333`));
