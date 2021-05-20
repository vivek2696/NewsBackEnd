const express = require("express");
const path = require("path");
const http = require("http");

const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./scratch");
const iplocate = require("node-iplocate");
const publicIp = require("public-ip");
//let io = require("socket.io");
const app = express();

// Add configure for ui and port

app.set("port", process.env.PORT || 3400);
app.use(express.static(path.join(__dirname, "public")));

//app.configure("development", () => {
//app.use(express.errorHandler());
//});

// Set up express
let server = http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

// Set up socket.io
const socketi = require("socket.io");
const io = socketi.listen(server);

// Handle socket traffic
io.sockets.on("connection", (socket) => {
  var list = io.sockets.sockets;
  var users = Object.keys(list);

  // Set the name property for a given client
  socket.on("nick", (nick) => {
    socket.set("nickname", nick);
    socket.emit("userlist", users);
    socket.emit("datetime", { datetime: new Date().getTime() });
  });

  // Relay chat data to all clients
  socket.on("chat", (data) => {
    socket.get("nickname", (err, nick) => {
      let nickname = err ? "Anonymous" : nick;

      let payload = {
        message: data.message,
        nick: nickname,
        time: new Date().toLocaleTimeString("en-US"),
      };

      socket.emit("chat", payload);
      socket.broadcast.emit("chat", payload);
    });
  });
});

/*
Use of Radium for Media Queries
*/
