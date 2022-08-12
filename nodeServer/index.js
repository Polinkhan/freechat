const { Server } = require("socket.io");

let user = {};
let port = process.env.PORT || 8000;

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

  socket.on("typing",(name)=>{
    socket.broadcast.emit("userIsTyping",name);
  })

  socket.on("stopTyping",(name)=>{
    socket.broadcast.emit("userStopedTyping",name);
  })
});
