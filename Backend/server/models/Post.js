const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
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
            type: String,
            required: false
        },
    },
    {
        timestamps: true, // Sửa "Timestamps" thành "timestamps"
    }
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;