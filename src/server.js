const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const routes = require("./routes");

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
  console.log(room);
  socket.join(room);

  socket.on("PlayerAction", (data) => {
    const {room, action} = data;
    console.log("ação feita");
    socket.to(room).emit("SetTune", action);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

exports.emitEvent = function (roomIdentifier, data) {  
  io.to(roomIdentifier).emit("UpdatePlaylist", data);
};

server.listen(3333, () => console.log(`Listening on port 3333`));
