const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 3300;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const db = mongoose.connect(
  "mongodb://127.0.0.1:27017/News", //"mongodb://127.0.0.1:27017/news" (FOR SOME PEOPLE)
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log("Something got wrong", err) : console.log("DB Connected")
);

//Routes
const adminRoutes = require("./routes/adminRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api", newsRoutes);

app.get("/", (req, res) => {
  res.send("App is running!!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
