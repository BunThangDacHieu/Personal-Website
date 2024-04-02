const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema(
    {
        "UserPassword": {
            type: String,
            required: true
        },
        "UserName": {
            type: String,
            required: [true, "can't be blank"],
            unique: true,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"], // Kiểm tra ký tự hợp lệ
            index: true,
        },
        "UserMail": {
            type: String,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'], index: true
        },
        "IsAdmin": {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
);


const User = mongoose.model('User', UserSchema);
module.exports = User;