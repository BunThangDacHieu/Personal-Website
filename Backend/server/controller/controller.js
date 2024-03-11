const mongoose = require('mongoose');
const User = require("../models/User");

//Save a new user in Monggose
exports.SaveUser = async (req, res) => {
    try {
        // Kiểm tra xem tất cả các trường cần thiết có trong phần thân yêu cầu không.

        if (
            !req.body.UserId ||
            !req.body.UserName ||
            !req.body.UserPassword ||
            !req.body.image ||
            !req.body.Email
        ) {
            // Nếu một hoặc nhiều trường cần thiết bị thiếu, gửi một phản hồi 400 kèm thông báo lỗi.

            return res.status(400).send({
                message: "Pls send the information of missing blank",
            });
        }
        // Tạo một đối tượng người dùng mới với dữ liệu từ phần thân yêu cầu.

        const newUser = new User({
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            UserPassword: req.body.UserPassword,
            image: req.body.image,
            Email: req.body.Email,
        });
        // Lưu đối tượng người dùng mới vào cơ sở dữ liệu.

        // const User = await User.create(newUser);
        const user = await newUser.save();
        // return res.status(201).send(User);
        // Gửi một phản hồi 201 kèm đối tượng người dùng được tạo mới.

        return res.status(201).send(user);
    } catch (error) {
        //Nếu lỗi gửi yêu cầu lên hệ thống có vấn đề, gửi tin nhắn lỗi
        console.log(error.message);
        // Gửi một phản hồi 500 kèm thông báo lỗi nếu có lỗi nội bộ trên máy chủ.

        res.status(500).send({ message: error.message });
    }
};

//Truy xuất tất cả người dùng trng cơ sở dữ liệu
exports.SeeAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        //Xây dụng đối tượng phản hồi và dữ liệu
        const ResponseData = {
            count: users.length,
            data: users,
        };
        //Gửi phản hồi với tại status(trạng thái) 200 và đối tượng được xay dựng
        return res.status(200).json(ResponseData);
    } catch (error) {
        //Nếu như có lỗi truy xuất dữ liệu, gửi tin nhắn cho hệ thống.
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.FindUserbyid = async (req, res) => {
    try {
        const id = req.params.id; // Trích xuất giá trị của tham số ':id' từ URL
        // Sử dụng phương thức findById để tìm kiếm người dùng dựa trên ID

        const users = await User.findById(id);
        // Nếu không tìm thấy người dùng với ID cung cấp, trả về một phản hồi 404 (Not Found)
        if (!users) {
            return res.status(404).json({ message: "None Exist" });
        }
        // Nếu tìm thấy người dùng, trả về một phản hồi 200 (OK) kèm thông tin của người dùng
        return res.status(200).json(users);
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, ghi lại thông điệp lỗi và trả về một phản hồi lỗi 500 (Internal Server Error)

        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

exports.UpdateUserInformation = async (req, res) => {
    try {
        // Kiểm tra xem tất cả các trường cần thiết có trong phần thân yêu cầu không.
        if (
            !req.body.UserId ||
            !req.body.UserName ||
            !req.body.UserPassword ||
            !req.body.image ||
            !req.body.Email
        ) {
            // Nếu một hoặc nhiều trường cần thiết bị thiếu, gửi một phản hồi 400 kèm thông báo lỗi.

            return res.status(400).send({
                message: "Pls send the information of missing blank",
            });
        }
        const { id } = req.params;

        const results = await User.findByIdAndUpdate(id, req.body);
        // Lưu đối tượng người dùng mới vào cơ sở dữ liệu.
        if (!results) {
            return res.status(404).json({ message: "None Exist" });
        }
        // Nếu tìm thấy người dùng, trả về một phản hồi 200 (OK) kèm thông tin của người dùng
        return res.status(200).json(results);
    } catch (error) {
        //Nếu lỗi gửi yêu cầu lên hệ thống có vấn đề, gửi tin nhắn lỗi
        console.log(error.message);
        // Gửi một phản hồi 500 kèm thông báo lỗi nếu có lỗi nội bộ trên máy chủ.
        res.status(500).send({ message: error.message });
    }
};

exports.DeleteUserbyId = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await User.findByIdAndDelete(id, req.body);
        // Lưu đối tượng người dùng mới vào cơ sở dữ liệu.
        if (!results) {
            return res.status(404).json({ message: "None Exist" });
        }
        // Nếu tìm thấy người dùng, trả về một phản hồi 200 (OK) kèm thông tin của người dùng
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (error) {
        //Nếu lỗi gửi yêu cầu lên hệ thống có vấn đề, gửi tin nhắn lỗi
        console.log(error.message);
        // Gửi một phản hồi 500 kèm thông báo lỗi nếu có lỗi nội bộ trên máy chủ.
        res.status(500).send({ message: error.message });
    }
};
