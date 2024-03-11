const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        "UserId": {
            type: Number,
            required: true,
            default: 0
        },
        "UserName": {
            type: String,
            required: true,
        },
        "UserPassword": {
            type: String,
            required: [true, "Please Enter the password"]
        },
        "image": {
            type: String,
            required: false
        },
        "Email": {
            type: String,
            required: true
        }
    },
    {
        Timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;