const express = require("express");
const router = express.Router();
const UserController = require("../controller/controller");


router.post("/users", UserController.CreateNewUser);
router.get("/users", UserController.SeeAllUser);
router.get("/users/:id", UserController.FindUserbyid);
router.put("/users/:id", UserController.UpdateUserInformation);
router.delete("/users/:id", UserController.DeleteUserbyId);

router.post("/post", UserController.CreateNewPost);
router.get("/post", UserController.SeeAllPost);
router.get("/post/:id", UserController.FindPostbyTitle);
router.delete("/post/:id", UserController.DeletePost);
router.put("/post/:id", UserController.UpdatePostInformation);

//tạo 1 category mới
router.get("/Category", UserController.See_All_Category);
router.post("/Category", UserController.Add_A_New_Category);
router.put("/Category/:Name", UserController.Update_Category_Information)
router.delete("/Category/:Name", UserController.Delete_Category_by_Name)
module.exports = router;
