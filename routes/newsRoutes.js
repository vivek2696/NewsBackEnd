const express = require("express");
const newsModel = require("../models/newsModel");
const router = express.Router();

//************* */ NEEDS SECRET KEY
 
const NewsModel = require('../models/newsModel');

router.get('/regular-news',(req, res) => {
    NewsModel.find({ isSports : false }, (err, data)=> {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log(data);
            res.json(data);
        }
    })
})

router.get('/sports-news', (req, res) => {
    NewsModel.find({ isSports : true }, (err, data) => {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.json(data);
        }
    })
})

router.get('/admin/news', (req, res) => {
    var headerInfo = req.cookies.token;

    if(headerInfo != null){
        var token = headerInfo.replace('Bearer ', '');

        try{
            var result = jwt.verify(token, 'NodeFinalProject@Team5SecreteKey');

            NewsModel.find((err, data) => {
                if(err){
                    console.log(err);
                    throw err;
                }
                else{ 
                    res.json(data);
                }
            });    
        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log('No JWT!');
        res.status(500).json({err: 'Not Authorized!!'});
    }
})

router.post('/admin/news', (req, res) => {
    var headerInfo = req.cookies.token;
    var newNews = new NewsModel();

    newNews.title = req.body.title; 
    newNews.description = req.body.description;
    newNews.url = req.body.url;
    newNews.image_url = req.body.image_url;
    newNews.isSports = req.body.isSports;

    if(headerInfo != null){
        var token = headerInfo.replace('Bearer ', '');

        try{
            var result = jwt.verify(token, 'NodeFinalProject@Team5SecreteKey');

            newNews.save((err, data) => {
                if(err){
                    console.log(err);
                    throw err;
                }
                else{ 
                    res.json(data);
                }
            });    
        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log('No JWT!');
        res.status(500).json({err: 'Not Authorized!!'});
    }
})


router.put('/admin/news/:id', (req, res) => {
    var headerInfo = req.cookies.token;
    var newsId = req.params.id;

    if(headerInfo != null && !newsId){
        var token = headerInfo.replace('Bearer ', '');

        try{
            var result = jwt.verify(token, 'NodeFinalProject@Team5SecreteKey');

            NewsModel.findByIdAndUpdate(newsId, req.body, (err, data) => {
                if(err){
                    console.log(err);
                    throw err;
                }
                else{ 
                    res.json(data);
                }
            });    
        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        if(headerInfo == null){
            console.log('No JWT');
            res.status(500).json({err: 'Not Authorized!!'});
        }
        else{
            console.log('No newId!');
            res.status(500).json({err: 'NewsId not found!!'});
        } 
    }
})

router.delete('/admin/news/:id', (req, res) => {
    var headerInfo = req.cookies.token;
    var newsId = req.params.id;

    if(headerInfo != null && !newsId){
        var token = headerInfo.replace('Bearer ', '');

        try{
            var result = jwt.verify(token, 'NodeFinalProject@Team5SecreteKey');

            NewsModel.findByIdAndDelete(newsId, (err, data) => {
                if(err){
                    console.log(err);
                    throw err;
                }
                else{ 
                    res.json(data);
                }
            });    
        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        if(headerInfo == null){
            console.log('No JWT');
            res.status(500).json({err: 'Not Authorized!!'});
        }
        else{
            console.log('No newId!');
            res.status(500).json({err: 'NewsId not found!!'});
        } 
    }
})




module.exports = router;
