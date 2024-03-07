const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
    },
    userType:{
        type:String,
        required: true
    }
});

// Create the model
const usersInfo = mongoose.model('usersInfos', userSchema);

module.exports = {usersInfo};
