const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        "UserName": {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
        },
        "Blog_id": {
            type: String,
            ref: 'Users'
        },
        "Content": {
            type: String
        },
        "title": {
            type: String
        }
    }
)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
