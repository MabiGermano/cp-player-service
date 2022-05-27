const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const routes = require("./routes");
const events = require("./models/Events");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
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
    const { roomId } = data;

    axios.get(`${process.env.PLAYLIST_SERVICE_ORIGIN}/${roomId}/playlist/next-video`)
    .then(data => {
        const {playlist} = data.data;
        console.log(playlist.currentPlaying);
        io.in(roomId).emit("UpdatePlayerVideo", playlist);
    })
    
  });

  socket.on("PreviousVideo", (data) => {
    const { roomId } = data;
    axios.get(`${process.env.PLAYLIST_SERVICE_ORIGIN}/${roomId}/playlist/previous-video`)
    .then(data => {
      const {playlist} = data.data;
      console.log(playlist.currentPlaying);
        io.in(roomId).emit("UpdatePlayerVideo", playlist);
    })
  });

  socket.on("PlaySpecificVideo", (data) => {
    const { roomId, action } = data;

    axios.put(`${process.env.PLAYLIST_SERVICE_ORIGIN}/${roomId}/playlist/`, action.playlist)
    .then(data => {
      const {playlist} = data.data;
        io.in(roomId).emit("UpdatePlayerVideo", playlist);
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
