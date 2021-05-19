const express = require("express");
const router = express.Router();

const Admin = require("../models/adminModel");

router.route("/").get((req, res) => {
    res.send("Admin API stuff");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email }).then((account) => {
        if (!account) {
            res.status(404).json({ msg: "User Not found." });
        } else {
            res.send(account);
        }
    });
    // Admin.create({ email, password });
});

module.exports = router;
