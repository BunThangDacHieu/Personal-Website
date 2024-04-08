const Category = require("../models/Category");
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User')

exports.LoginUser = async (req, res) => {
    try {
        const { userMail, UserPassword } = req.body;
        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ userMail });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(UserPassword, user.UserPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Tạo JWT
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        // Gửi JWT về client
        res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



//Tạo ra một Category mới + điều kiện liệu dữ liệu đó đã tồn tại hay chưa
exports.Add_A_New_Category = async (req, res) => {
    try {
        // Kiểm tra xem dữ liệu đầu vào có tồn tại không
        if (!req.body.Name) {
            return res.status(400).json({ message: "Name field is required" });
        }

        const { Name } = req.body;

        // Kiểm tra xem danh mục đã tồn tại chưa
        const existingCategory = await Category.findOne({ Name });

        if (existingCategory) {
            return res.status(409).json({ message: "Category already exists" });
        }

        // Tạo một danh mục mới nếu nó chưa tồn tại
        const newCategory = new Category({ Name });
        const category = await newCategory.save();
        return res.status(201).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//Hiện lên toàn bộ dữ liệu/tên Thể Loại(Category)
//Kiểm tra lại bằng PostMan hoặc dùng thẳng URL
exports.See_All_Category = async (req, res) => {
    try {
        const category = await Category.find({});
        // Build response object with data
        const responseData = {
            count: category.length,
            data: category,
        };
        // Send response with status 200 and built object
        return res.status(200).json(responseData);
    } catch (error) {
        // If there is an error accessing the data, send a message to the system.
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


//Cập nhật lại thông tin của Category/Thể loại - Edit điều chỉnh lại Tên của thể loại đó
//Nếu có thể thì tạo một page riêng + See_All_Category + FindById
//để có thể xem được các post có cùng thể loại

exports.Update_Category_Information = async (req, res) => {
    try {
        if (!req.body.Name) {
            return res.status(400).send({
                message: "Please provide a category name to update"
            });
        }

        const { Name } = req.params;

        // Tìm và cập nhật danh mục dựa trên tên
        const updatedCategory = await Category.findOneAndUpdate(
            { Name: Name }, // Điều kiện tìm kiếm
            req.body, // Dữ liệu cập nhật
            { new: true } // Trả về tài nguyên đã được cập nhật
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found or updated unsuccessfully" });
        }

        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


//Xóa Tên Thể Loại.
exports.Delete_Category_by_Name = async (req, res) => {
    try {
        const { Name } = req.params;
        const results = await Category.findOneAndDelete({ Name });
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
exports.CreateNewUser = async (req, res) => {
    try {
        // Check if all required fields are present in the request body
        const { UserPassword, UserMail } = req.body;
        if (!UserPassword || !UserMail) {
            // If one or more required fields are missing, send a 400 response with an error message
            return res.status(400).send({ message: "Please provide UserPassword and UserMail" });
        }
        // Create a new user object with only UserPassword and userMail
        const newUser = new User({
            UserPassword,
            UserMail
        });
        // const existingUser = await collection.findOne({ UserMail: newUser.UserMail });
        // if (existingUser) {
        //     return res.status(409).send('User already exits, please try again');
        // }
        if (newUser) {
            return res.status(409).send('')
        }

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
            !req.body.UserPassword ||
            !req.body.UserMail
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


//Hệ thống API, CRUD của bài Post
exports.CreateNewPost = async (req, res) => {
    try {
        const newPost = new Post({
            Title: req.body.UserName,
            Contenr: req.body.Content,
            image: req.body.title,
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

exports.FindPostbyTitle = async (req, res) => {
    try {
        const title = req.params.Title;
        const post = await Post.findOne({ title });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.DeletePost = async (req, res) => {
    try {
        const { Title } = req.params;
        const results = await Post.findOneAndDelete(Title, req.body);
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
            !req.body.Title ||
            !req.body.Content ||
            !req.body.image
        ) {
            return res.status(400).send({
                message: "Please provide all required information",
            });
        }
        const { Title } = req.params;
        const results = await Post.findByIdAndUpdate(Title, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};