import {ObjectId} from 'mongoose'

export interface Posts{
    Title: string,
    Content: string,
    image?: Buffer; 
    userId: ObjectId; // Sử dụng kiểu dữ liệu ObjectId của Mongoose
    createdAt?: Date; // Trường này được tự động thêm bởi Mongoose nếu bạn sử dụng timestamps: true
    updatedAt?: Date;
} 