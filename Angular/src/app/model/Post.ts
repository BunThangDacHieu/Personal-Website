import {ObjectId} from 'mongoose'

export interface Posts{
    Title: string,
    category: {
        category_id: string,
        category: string
    }
    Content: string,
    image?: string;
    Permalink: string;
    userId: ObjectId; // Sử dụng kiểu dữ liệu ObjectId của Mongoose
    createdAt?: Date;    // Trường này được tự động thêm bởi Mongoose nếu bạn sử dụng timestamps: true
    updatedAt?: Date;
    Excerpt: string;
    view: number;
    status: string
} 