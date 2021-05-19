const express = require("express");
const router = express.Router();

router.route("/query").get((req, res) => {
    res.send("Query API stuff");
});

module.exports = router;
