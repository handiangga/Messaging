const routers = require("express").Router();
const messageController = require("../controller/messageController");

routers.get("/", messageController.showAll);
routers.post("/", messageController.sendMessage);
routers.delete("/:id", messageController.deleteMessage);

module.exports = routers;
