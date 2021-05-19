const express = require("express");
const router = express.Router();

router.route("/news").get((req, res) => {
    res.send("News API stuff");
});

module.exports = router;
