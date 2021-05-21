const express = require("express");
const router = express.Router();

const Admin = require("../models/adminModel");

router.route("/").get((req, res) => {
    res.send("Admin API stuff");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email + ": " + password);
    Admin.findOne({ email }).then((account) => {
        // If account not exist, then 404
        if (!account) {
            res.status(404).json({ msg: "User Not found." });
        }
        // Else compare password hash and set cookie with token
        else {
            //console.log(account);

            if (account.comparePasswordHash(password)) {
                const token = account.genUserObj().token;
                res.cookie("token", token, {
                    maxAge: 900000,
                    httpOnly: true,
                });
                var response = { ...account, token };
                console.log("Response: " + response);
                res.send(response);
            } else {
                res.status(401).json({ msg: "Invalid Credentials." });
            }
        }
    });
    // Admin.create({ email, password });
});

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const admin = new Admin();
    admin.name = name;
    admin.email = email;

    admin.genPasswordHash(password);

    admin
        .save()
        .then((newUser) => {
            if (newUser) return res.json({ message: "Admin Created" });
            else return res.json({ err: "Error creating Admin" });
        })
        .catch((err) => res.status(500).json(err));
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
    });
    res.json({ isLoggedIn: false });
});

module.exports = router;
