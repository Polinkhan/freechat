const { Server } = require("socket.io");

let user = {};
let port = process.env.PORT || 5500;

const io = new Server(port, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (massege) => {
    socket.broadcast.emit("receive", {
      massege: massege,
      name: user[socket.id],
    });
  });
});
