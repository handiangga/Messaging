"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMessage.belongsTo(models.User);
      UserMessage.belongsTo(models.Message);
    }
  }
  UserMessage.init(
    {
      UserId: DataTypes.INTEGER,
      MessageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserMessage",
    }
  );
  return UserMessage;
};
