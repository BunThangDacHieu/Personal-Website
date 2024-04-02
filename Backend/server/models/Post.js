const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        "Category": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // Tham chiếu đến mô hình Category
        },
        "Title": {
            type: String,
            required: true,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        "Content": {
            type: String,
            required: true
        },
        "image": {
            type: Buffer,
            required: false
        },
        "userId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;