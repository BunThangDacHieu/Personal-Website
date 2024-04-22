const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        "Post_id": {
            type: mongoose.Schema.Types.ObjectId,
            default: function () {
                return new mongoose.Types.ObjectId(); // Sử dụng một hàm callback để tạo mới ObjectId
            },
            unique: true,
        },
        "Category": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // Tham chiếu đến mô hình Category
        },
        "title": {
            type: String,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        "content": {
            type: String,
        },
        "image": {
            type: String
        },
        "permalink": {
            type: String,
        },
        "userId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        "excerpt": {
            type: String,

        },
        "isFeatured": {
            type: Boolean,
        },
        "views": {
            type: Number
        },
        "status": {
            type: String
        }
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;