const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        "Category_id": {
            type: mongoose.Schema.Types.ObjectId,
            default: function () {
                return new mongoose.Types.ObjectId(); // Sử dụng một hàm callback để tạo mới ObjectId
            },
            unique: true,
        },
        "Name": {
            type: String,
            required: true // Sửa thành 'required' thay vì 'dequired'
        }
    }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
