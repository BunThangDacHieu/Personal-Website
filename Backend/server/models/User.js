const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
    {
        "roleId": {
            type: String,
            required: ['admin', 'users'],
            validate: {
                validator: function (value) {
                    if (value === 'user' || value === 'admin') {
                        return true; // 
                    }
                    return false; // 
                },
                message: 'This account is none-exits'
            }
        },
        "Blog_id": {
            type: String
        },
        "Title": {
            type: String
        },
        "Content": {
            type: String
        },
        "UserName": {
            type: String,
            required: [true, "can't be blank"],
            unique: true, match: [/^[a-zA-Z0-9] +$/, "is invalid"], index: true,
        },
        "image": {
            type: String,
            required: false
        },
        "userMail": {
            type: String,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'], index: true
        },
        "status": { // Đổi từ "[status]" thành "status"
            type: String,
            required: ['online', 'offline'],
            index: true,
        },
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;