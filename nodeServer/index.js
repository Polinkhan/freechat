const { Server } = require("socket.io");

let user = {};
let imgData = {};
let port = process.env.PORT || 8000;

const io = new Server(port, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(Object.keys(user).length);
  socket.on("new-user-joined", (name, imgSrc) => {
    user[socket.id] = name;
    imgData[socket.id] = imgSrc;
    socket.broadcast.emit("user-joined", name, socket.id, imgData[socket.id], user);
  });

  socket.on("ActiveUserNumer", () => {
    socket.emit("receiveActiveUserNumer", Object.keys(user).length);
  });

  socket.on("requstUserData", () => {
    socket.emit("getUserData", user, imgData);
  });

  socket.on("send", (massege) => {
    socket.broadcast.emit("receive", massege, user[socket.id], imgData[socket.id]);
  });

  socket.on("sendImg", (imgSrc) => {
    socket.broadcast.emit("receiveImg", imgSrc, user[socket.id]);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("userIsTyping", name, socket.id, user);
  });

  socket.on("stopTyping", (name) => {
    socket.broadcast.emit("userStopedTyping", socket.id, user);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("userLeave", user[socket.id], socket.id, user);
    socket.broadcast.emit("userStopedTyping", socket.id, user);
    delete user[socket.id];
    delete imgData[socket.id];
  });
});
