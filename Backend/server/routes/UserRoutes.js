const express = require("express");
const router = express.Router();
const UserController = require("../controller/controller");

router.post("/users", UserController.SaveUser);
router.get("/users", UserController.SeeAllUser);
router.get("/users/:id", UserController.FindUserbyid);
router.put("/users/:id", UserController.UpdateUserInformation);
router.delete("/users/:id", UserController.DeleteUserbyId);
module.exports = router;
