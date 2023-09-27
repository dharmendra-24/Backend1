const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    roll: {
        type: String,
        required: true

    },
    add: {
        type: String,
        // required: true,
    }



});
module.exports = mongoose.model("user1", userSchema);