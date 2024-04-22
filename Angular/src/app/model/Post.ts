import {ObjectId} from 'mongoose'

export interface Posts{
    Post_id: string,
    title: string,
    Category: {
        category_id: string,
        category: string
    }
    content: string,
    image?: string;
    permalink: string;
    userId: ObjectId; // Sử dụng kiểu dữ liệu ObjectId của Mongoose
    createdAt?: Date;    // Trường này được tự động thêm bởi Mongoose nếu bạn sử dụng timestamps: true
    updatedAt?: Date;
    excerpt: string;
    view: number;
    status: string
} 