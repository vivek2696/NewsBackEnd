const mongoose = require("mongoose");
Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "NodeFinalProject@Team5SecreteKey";

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

adminModel.methods.genPasswordHash = function (inputPassword) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(inputPassword, salt);
};

adminModel.methods.comparePasswordHash = function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
};

adminModel.methods.genUserObj = function () {
    const payload = {
        name: this.username,
        email: this.email,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    return { token };
};

module.exports = mongoose.model("admin", adminModel, "AdminList");
//the third argument is the collection name
