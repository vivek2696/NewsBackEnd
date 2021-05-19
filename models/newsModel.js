const mongoose = require("mongoose");

var newsModel = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        url: { type: String },
        image_url: { type: String },
        isSports: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("news", newsModel, "newslist");
