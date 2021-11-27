const routers = require("express").Router();
const userRouters = require("./user");
const messageRouters = require("./message");
const listfriendRouters = require("./listFriend");
const { authentication } = require("../middlewares/auth");

routers.use("/", userRouters);
routers.use(authentication);
routers.use("/message", messageRouters);
routers.use("/listFriend", listfriendRouters);

module.exports = routers;
