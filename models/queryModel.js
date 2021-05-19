const mongoose = require("mongoose");
Schema = mongoose.Schema;

var queryModel = new Schema(
    {
        email: { type: String },
        query: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("query", queryModel, "querylist");
//the third argument is the collection name
