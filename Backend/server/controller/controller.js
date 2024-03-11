const mongoose = require("mongoose");
const User = require("../models/User");


exports.postUser = async (req, res) => {
    console.log(req.body);
    try {
        if (
            !req.body.UserId ||
            !req.body.UserName ||
            !req.body.UserPassword ||
            !req.body.image ||
            !req.body.Email
        ) {
            return res.status(400).send({
                message: 'Pls send the information of missing blank',
            });
        }
        const newUser = new User({
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            UserPassword: req.body.UserPassword,
            image: req.body.image,
            email: req.body.Email,
        });
        const User = await User.create(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};