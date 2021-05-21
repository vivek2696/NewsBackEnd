const express = require("express");
const mongoose = require("mongoose");

const port = 3300;
const app = express();

app.use(express.json());

const db = mongoose.connect("mongodb://127.0.0.1:27017/news");

app.get("/", (req, res) => {
    res.send("App is running!!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
