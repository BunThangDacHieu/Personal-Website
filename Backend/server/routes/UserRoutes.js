const express = require("express");
const router = express.Router();
const UserController = require("../controller/controller");


router.post("/users", UserController.CreateNewUser);
router.get("/users", UserController.SeeAllUser);
router.get("/users/:id", UserController.FindUserbyid);
router.put("/users/:id", UserController.UpdateUserInformation);
router.delete("/users/:id", UserController.DeleteUserbyId);

// router.post("/post", UserController.CreateNewPost);
// router.get("/post", UserController.SeeAllPost);
// router.get("/post/:id", UserController.FindPostbyid);
// router.delete("/post/:id", UserController.DeletePostbyId);
// router.put("/post/:id", UserController.UpdatePostInformation);

module.exports = router;
