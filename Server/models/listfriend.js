"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListFriend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListFriend.belongsTo(models.User, { foreignKey: "UserId" });
      ListFriend.belongsTo(models.User, { foreignKey: "friendId" });
    }
  }
  ListFriend.init(
    {
      UserId: DataTypes.INTEGER,
      friendId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ListFriend",
    }
  );
  return ListFriend;
};
