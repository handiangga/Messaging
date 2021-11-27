"use strict";
const hashPassword = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ListFriend, { foreignKey: "UserId" });
      User.hasMany(models.ListFriend, { foreignKey: "friendId" });
      User.belongsToMany(models.Message, {
        as: "UserMessages",
        through: models.UserMessage,
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "Format Email can be true",
          },
        },
      },
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be null",
          },
          notEmpty: {
            msg: "password cannot be empty",
          },
          len: {
            args: [5],
            msg: "Minimum 5 characters required in password",
          },
        },
      },
      gender: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phoneNumber cannot be null",
          },
          notEmpty: {
            msg: "phoneNumber cannot be empty",
          },
          len: {
            args: [5],
            msg: "Minimum 5 characters required in phoneNumber",
          },
        },
      },
      imageProfile: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
