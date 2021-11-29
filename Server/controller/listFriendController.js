const { ListFriend, User } = require("../models");
class listFriendController {
  static async showAll(req, res, next) {
    try {
      const listFriend = await ListFriend.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [User],
      });
      let friend = listFriend.map((item) => {
        return {
          id: item.id,
          UserId: item.UserId,
          friendId: item.friendId,
        };
      });
      res.status(200).json(friend);
    } catch (error) {
      next(error);
    }
  }
  static async addFriend(req, res, next) {
    try {
      let { friendId } = req.body;
      //showall dulu
      const showAll = await ListFriend.findAll({
        where: { UserId: req.user.id },
      });
      //cek friendId apakah sudah ada di listFriend
      const checkFriend = showAll.filter((item) => {
        return item.friendId === friendId;
      });
      if (checkFriend.length > 0) {
        res.status(400).json({
          message: "Friend already exist",
        });
      } else {
        const newFriend = await ListFriend.create({
          UserId: req.user.id,
          friendId,
        });
        res.status(201).json(newFriend);
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteFriend(req, res, next) {
    try {
      const listFriend = await ListFriend.destroy({
        where: {
          UserId: req.users.id,
          friendId: +req.params.friendId,
        },
      });
      res.status(200).json(listFriend);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = listFriendController;
