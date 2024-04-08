const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    UserMail: {
        type: String,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        unique: true,
        match: /^[a-zA-Z0-9]+$/
    },
    UserPassword: {
        type: String,
        required: true,
        select: false
    },
    IsAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = async function (password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    this.UserPassword = hashedPassword;
};

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.UserPassword);
};

UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        email: this.UserMail,
        username: this.UserName,
        isAdmin: this.IsAdmin
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
