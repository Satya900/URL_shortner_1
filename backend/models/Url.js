const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longURL : {
        type: String,
        required: true
    },
    shortCode : {
        type: String,
        required: true,
        unique: true
    },
    createdAt : {
        type: Date,
        default: Date.now,

    },
    clicks : {
        type: Number,
        default: 0
    }

})


module.exports = mongoose.model('Url', urlSchema);