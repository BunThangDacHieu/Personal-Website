const mongoType = require('mongoose').Types;
const User = require("../models/User");
const Post = require('../models/Post');
const { post } = require('../routes/UserRoutes');

// Save a new user in Mongoose
exports.SaveUser = async (req, res) => {
    try {
        // Check if all required fields are present in the request body
        if (
            !req.body.roleId ||
            !req.body.UserName ||
            !req.body.UserPassword ||
            !req.body.image ||
            !req.body.userMail ||
            !req.body.status
        ) {
            // If one or more required fields are missing, send a 400 response with an error message
            return res.status(400).send({
                message: "Please provide all required information",
            });
        }

        // Create a new user object with data from the request body
        const newUser = new User({
            roleId: req.body.roleId,
            UserName: req.body.UserName,
            hash: req.body.UserPassword,
            image: req.body.image,
            userMail: req.body.userMail,
            status: req.body.status
        });

        // Save the new user object to the database
        const user = await newUser.save();

        // Send a 201 response with the newly created user object
        return res.status(201).send(user);
    } catch (error) {
        // If an error occurs during request processing, log the error message and send a 500 response with an error message
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Access all users in the database
exports.SeeAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        // Build response object with data
        const responseData = {
            count: users.length,
            data: users,
        };
        // Send response with status 200 and built object
        return res.status(200).json(responseData);
    } catch (error) {
        // If there is an error accessing the data, send a message to the system.
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.FindUserbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await User.findById(id);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.UpdateUserInformation = async (req, res) => {
    try {
        if (
            !req.body.UserId ||
            !req.body.UserName ||
            !req.body.UserPassword ||
            !req.body.image ||
            !req.body.Email
        ) {
            return res.status(400).send({
                message: "Please provide all required information",
            });
        }
        const { id } = req.params;
        const results = await User.findByIdAndUpdate(id, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.DeleteUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await User.findByIdAndDelete(id, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.CreateNewPost = async (req, res) => {
    try {
        const newPost = new Post({
            Blog_id: req.body.Blog_id,
            UserName: req.body.UserName,
            Content: req.body.Content,
            title: req.body.title,
        });
        const post = await newPost.save();
        return res.status(201).send(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.SeeAllPost = async (req, res) => {
    try {
        const post = await Post.find({});
        const responseData = {
            count: post.length,
            data: post,
        };
        return res.status(200).json(responseData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.FindPostbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.DeletePostbyId = async (req, res) => {
    try {
        const { Blog_id } = req.params;
        const results = await Post.findByIdAndDelete(Blog_id, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
exports.UpdatePostInformation = async (req, res) => {
    try {
        if (
            !req.body.Blog_id ||
            !req.body.UserName ||
            !req.body.Content ||
            !req.body.title
        ) {
            return res.status(400).send({
                message: "Please provide all required information",
            });
        }
        const { Blog_id } = req.params;
        const results = await Post.findByIdAndUpdate(Blog_id, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};