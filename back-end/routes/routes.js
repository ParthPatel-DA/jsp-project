var express = require("express");
var router = express.Router();

var userController = require("../controller/userController");

router.post("/editUser", userController.editUser);
router.post("/deleteUser", userController.deleteUser);
router.get("/getAllUser", userController.getAllUser);

var taskController = require("../controller/taskController");

router.post("/addTask", taskController.addTask);
router.post("/editTask", taskController.editTask);
router.post("/deleteTask", taskController.deleteTask);
router.post("/makeCompleteTask", taskController.makeCompleteTask);
router.post("/assignTask", taskController.assignTask);
router.get("/getAllTask", taskController.getAllTask);

module.exports = router;
