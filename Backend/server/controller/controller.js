const Category = require("../models/Category");
const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const GridFSBucket = require("mongodb").GridFSBucket;
const multer = require('multer');
const path = require('path');  // Import the 'path' module for filename generation
const connectDB = require('../config/db');

const imgBucket = process.env.ImageBucket;
const baseUrl = process.env.PORT;

/*-------------------------Improvement---------------------------*/
const storage = multer.diskStorage({
    destination: 'upload/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedExtensions = ['image/jpeg', 'image/png'];
        if (!allowedExtensions.includes(file.mimetype)) {
            return cb(new multer.MulterError('File type not allowed'));
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 }  // Set a maximum file size limit (5MB in this example)
});


/*----------------------------UploadImage----------------------------------*/

exports.uploadImage = async (req, res) => {
    try {
        // Handle file upload using Multer middleware
        await upload.single('image')(req, res, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: `Error uploading image: ${err.message}` });
            }

            // Access uploaded file information from req.file
            const { filename, contentType } = req.file;

            if (!filename) {
                throw new Error("Filename not found in uploaded file");
            }

            // Respond with success message and file details
            res.send({ message: "Uploaded", filename, contentType });

        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: `Error processing image upload: ${error.message}` });
    }
};


exports.getListFiles = async (req, res) => {
    try {
        await connectDB(); // Kết nối đến cơ sở dữ liệu MongoDB

        const database = mongoose.connection.db; // Sử dụng kết nối đã thiết lập bởi Mongoose
        const photos = database.collection(imgBucket + ".files");

        const cursor = photos.find({});

        if ((await cursor.count()) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
            });
        });

        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

exports.download = async (req, res) => {
    try {
        await connectDB(); // Kết nối đến cơ sở dữ liệu MongoDB

        const database = mongoose.connection.db; // Sử dụng kết nối đã thiết lập bởi Mongoose
        const bucket = new GridFSBucket(database, {
            bucketName: imgBucket,
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res.status(404).send({ message: "Cannot download the Image!" });
        });

        downloadStream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

/*--------------------------------------------------------------------------*/


exports.getUserAdminStatus = async (userMail) => {
    try {
        // Tìm kiếm người dùng trong cơ sở dữ liệu với email tương ứng
        const user = await User.findOne({ UserMail: userMail, isAdmin: true });
        // Kiểm tra xem người dùng có tồn tại và có quyền Admin hay không
        if (user && user.IsAdmin) {
            return true; // Người dùng là Admin
        } else {
            return false; // Người dùng không phải là Admin hoặc không tồn tại
        }
    } catch (error) {
        console.error("Error retrieving user admin status:", error);
        return false; // Trả về false nếu có lỗi xảy ra
    }
};


exports.LoginUser = async (req, res) => {
    try {
        const { UserMail, UserPassword } = req.body;

        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ UserMail });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Xác thực mật khẩu
        const isPasswordValid = await user.validatePassword(UserPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Tạo JWT
        const token = user.generateJWT();

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
        const { Category_id } = req.params;
        const updatedCategoryData = req.body;
        const updatedCategory = await Category.findOneAndUpdate(
            Category_id, updatedCategoryData, { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found or not updated successfully" });
        }

        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



//Xóa Tên Thể Loại.
exports.Delete_Category_by_Id = async (req, res) => {
    try {
        const { Category_id } = req.params;
        const results = await Category.findOneAndDelete({ Category_id });
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
        // Kiểm tra xem tài khoản đã tồn tại trong cơ sở dữ liệu hay chưa
        const existingUser = await User.findOne({ UserMail: req.body.UserMail });
        if (existingUser) {
            return res.status(409).send({ message: 'This Account is Already Exists' });
        }

        // Tạo mới người dùng
        const newUser = new User({
            UserMail: req.body.UserMail,
            // UserName: req.body.UserName,
            UserPassword: req.body.UserPassword
        });

        // Đặt mật khẩu cho người dùng
        await newUser.setPassword(req.body.UserPassword);

        // Lưu người dùng mới vào cơ sở dữ liệu
        const user = await newUser.save();

        // Tạo JWT cho người dùng
        const token = newUser.generateJWT();

        // Gửi phản hồi 201 với thông tin người dùng vừa được tạo mới và JWT
        return res.status(201).send({ user, token });
    } catch (error) {
        // Ghi log lỗi và gửi phản hồi 500 nếu có lỗi xảy ra
        console.error(error.message);
        res.status(500).send({ message: 'An error occurred during signup.' });
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

exports.FindUserbyUserMail = async (req, res) => {
    try {
        const UserMail = req.params.UserMail;
        const users = await User.FindUserbyUserMail(UserMail);
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
        const { UserMail } = req.params;
        const results = await User.findByUserMailAndUpdate(UserMail, req.body);
        if (!results) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.DeleteUserbyUserMail = async (req, res) => {
    try {
        const { UserMail } = req.params;
        const results = await User.findByUserMailAndDelete(UserMail, req.body);
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
            Category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            permalink: req.body.permalink,
            excerpt: req.body.excerpt,
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
        return res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.FindPostbyTitle = async (req, res) => {
    try {
        const Post_id = req.params.Title;
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

        const { id } = req.params;
        console.log(id, 'gg');
        const deletedPost = await Post.findOneAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
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