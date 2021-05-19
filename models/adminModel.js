const mongoose = require("mongoose");
Schema = mongoose.Schema;

var adminModel = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("admin", adminModel, "AdminList");
//the third argument is the collection name
