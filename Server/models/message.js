"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsToMany(models.User, {
        as: "UserMessages",
        through: models.UserMessage,
      });
    }
  }
  Message.init(
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "message cannot be null",
          },
          notEmpty: {
            msg: "message cannot be empty",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
