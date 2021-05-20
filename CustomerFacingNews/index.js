const express = require("express");
const mongoose = require("mongoose");

////////////////////////////////////////////////
const path = require("path");
const http = require("http");

const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./scratch");
const iplocate = require("node-iplocate");
const publicIp = require("public-ip");
////////////////////////////////////////////////
const port = 3400;
const app = express();

app.use(express.json());

/////////////////////////////////
app.set(port);
app.use(express.static(path.join(__dirname, "public")));
/////////////////////////////////
const db = mongoose.connect(
  "mongodb://127.0.0.1:27017/News",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log("Something got wrong", err) : console.log("DB Connected")
);

//Routes
const newsRoutes = require("./routes/newsRoutes");
const queryRoutes = require("./routes/queryRoutes");

app.use("/api", newsRoutes);
app.use("/api", queryRoutes);

app.get("/", (req, res) => {
  res.send("App is running!!");
});

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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
