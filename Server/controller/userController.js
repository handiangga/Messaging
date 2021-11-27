const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { jwtSign } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      imageProfile: req.body.imageProfile,
    };
    User.create(newUser)
      .then((data) => {
        res.status(201).json({ id: data.id, email: data.email });
      })
      .catch((err) => {
        next(err);
      });
  }
  static login(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (data) {
          if (comparePassword(req.body.password, data.password)) {
            let payload = {
              id: data.id,
              email: data.email,
              role: data.role,
            };
            let access_token = jwtSign(payload);
            res.status(200).json({ access_token });
          } else {
            next({
              name: "Invalid Login",
              message: `email/password not match`,
            });
          }
        } else {
          next({
            name: "Invalid Login",
            message: `email/password not match`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = UserController;
