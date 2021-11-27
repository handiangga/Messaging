const routers = require("express").Router();
const listFriendController = require("../controller/listFriendController");

routers.get("/", listFriendController.showAll);
routers.post("/", listFriendController.addFriend);
routers.delete("/", listFriendController.deleteFriend);

module.exports = routers;
