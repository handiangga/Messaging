const routers = require("express").Router();
const UserController = require("../controller/userController");

routers.post("/register", UserController.register);
routers.post("/login", UserController.login);

module.exports = routers;
