const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        "Category": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // Tham chiếu đến mô hình Category
        },
        "Title": {
            type: String,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        "Content": {
            type: String,
        },
        "image": {
            type: String,
            required: false
        },
        "Permalink": {
            type: String,
        },
        "userId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        "Excerpt": {
            type: String,

        }
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;