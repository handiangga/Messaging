const { Message, User, UserMessage } = require("../models");
const { Op } = require("sequelize");
class messageController {
  static async showAll(req, res, next) {
    try {
      const messages = await UserMessage.findAll({
        where: {
          [Op.or]: [{ UserId: req.user.id }, { to: req.user.id }],
        },
        include: [User, Message],
      });
      // const newStatus = null;
      // if (messages.status === "unread") {
      //   newStatus = await messages.update((messages.status = "read"), {
      //     where: { id: id },
      //     returning: true,
      //   });
      // }
      let listMessages = messages.map((message) => {
        return {
          id: message.id,
          from: message.User.name,
          to: message.to,
          message: message.Message.message,
          status: message.Message.status,
          createdAt: message.Message.createdAt.toString(),
        };
      });
      res.status(200).json({
        listMessages,
      });
    } catch (error) {
      next(error);
    }
  }
  static async showById(req, res, next) {}
  static async sendMessage(req, res, next) {
    let newMessage = {
      message: req.body.message,
      status: "unread",
    };
    try {
      const message = await Message.create(newMessage);
      const userMessage = await UserMessage.create({
        UserId: req.user.id,
        MessageId: message.id,
        to: req.body.to,
      });
      res.status(201).json({
        message,
        userMessage,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteMessage(req, res, next) {
    try {
      const message = await UserMessage.destroy({
        where: { id: +req.params.id },
      });
      if (message) {
        res.status(200).json({
          message: "Message has been deleted",
        });
      } else {
        next({
          name: "Not Found",
          message: "Message not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = messageController;
