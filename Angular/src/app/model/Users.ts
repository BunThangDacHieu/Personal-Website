export interface Users{
    UserPassword: string;
    UserName: string;
    UserMail: string;
    IsAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}