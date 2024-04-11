const express = require("express");
const router = express.Router();
const UserController = require("../controller/controller");

router.get("/users/isAdmin", UserController.getUserAdminStatus);
router.post("/users/register", UserController.CreateNewUser);
router.post("/users/login", UserController.LoginUser);


router.get("/users", UserController.SeeAllUser);
router.get("/users/:UserMail", UserController.FindUserbyUserMail);
router.put("/users/:Usermail", UserController.UpdateUserInformation);
router.delete("/users/:UserMail", UserController.DeleteUserbyUserMail);

router.post("/post", UserController.CreateNewPost);
router.get("/post", UserController.SeeAllPost);
router.get("/post/:id", UserController.FindPostbyTitle);
router.delete("/post/:id", UserController.DeletePost);
router.put("/post/:id", UserController.UpdatePostInformation);

//tạo 1 category mới
router.get("/Category", UserController.See_All_Category);
router.post("/Category", UserController.Add_A_New_Category);
router.put("/Category/:_id", UserController.Update_Category_Information)
router.delete("/Category/:Category_id", UserController.Delete_Category_by_Id)
module.exports = router;
