const express = require("express");
const newsModel = require("../models/newsModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

const NewsModel = require("../models/newsModel");
const SECRET_KEY = "NodeFinalProject@Team5SecreteKey";
const LIMIT_NEWS_PER_PAGE = 10;

router.get("/admin/news", (req, res) => {
    const token = req.cookies.token;
    //const skip = (req.query.page - 1) * LIMIT_NEWS_PER_PAGE;
    //console.log('skip:', skip, ' limit:',LIMIT_NEWS_PER_PAGE)
    console.log(token);

    if (token != null) {
        try {
            var result = jwt.verify(token, SECRET_KEY);
            console.log("Fetching data!");
            NewsModel.find(
                {},
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
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        console.log("No JWT!");
        res.status(500).json({ err: "Not Authorized!!" });
    }
});

router.post("/admin/news", (req, res) => {
    var token = req.cookies.token;
    var newNews = new NewsModel();

    newNews.title = req.body.title;
    newNews.description = req.body.description;
    newNews.url = req.body.url;
    newNews.image_url = req.body.image_url;
    newNews.isSports = req.body.isSports;

    if (token != null) {
        try {
            var result = jwt.verify(token, SECRET_KEY);

            newNews.save((err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.json(data);
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        console.log("No JWT!");
        res.status(500).json({ err: "Not Authorized!!" });
    }
});

router.put("/admin/news/:id", (req, res) => {
    var token = req.cookies.token;
    var newsId = req.params.id;
    console.log("NewsId: ", newsId);

    if (token != null && (newsId != "" || newsId != undefined)) {
        try {
            var result = jwt.verify(token, SECRET_KEY);

            NewsModel.findByIdAndUpdate(newsId, req.body, (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.json(data);
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        if (token == null) {
            console.log("No JWT");
            res.status(500).json({ err: "Not Authorized!!" });
        } else {
            console.log("No newId!");
            res.status(500).json({ err: "NewsId not found!!" });
        }
    }
});

router.delete("/admin/news/:id", (req, res) => {
    var token = req.cookies.token;
    var newsId = req.params.id;

    if (token != null && (newsId != "" || newsId != undefined)) {
        try {
            var result = jwt.verify(token, SECRET_KEY);

            NewsModel.findByIdAndDelete(newsId, (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.json(data);
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        if (token == null) {
            console.log("No JWT");
            res.status(500).json({ err: "Not Authorized!!" });
        } else {
            console.log("No newId!");
            res.status(500).json({ err: "NewsId not found!!" });
        }
    }
});

module.exports = router;
