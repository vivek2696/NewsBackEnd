const express = require("express");
const router = express.Router();

const NewsModel = require("../models/newsModel");

router.get("/regular-news", (req, res) => {
    NewsModel.find(
        { isSports: false },
        null,
        { sort: { createdAt: -1 } },
        (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log(data);
                res.json(data);
            }
        }
    );
});

router.get("/sports-news", (req, res) => {
    NewsModel.find(
        { isSports: true },
        null,
        { sort: { createdAt: -1 } },
        (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.json(data);
            }
        }
    );
});

router.get("/news/:id", (req, res) => {
    let id = req.params.id;
    console.log("Fetching news by id:", id);

    NewsModel.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

router.get("/news/url/:id", (req, res) => {
    const newsURL = req.params.id;
    console.log("Fetching news by URL:", newsURL);

    NewsModel.findOne({ url: newsURL }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

module.exports = router;
