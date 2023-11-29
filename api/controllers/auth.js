const User = require("../models/User");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }
  try {
    const { name, email, password } = req.body;
    const securedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: securedPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    err = new HttpError("Something went wrong!", 500);
    return next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new HttpError("User with that email doesn't exists.");
      return next(error);
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      const error = new HttpError("Enter a correct password.");
      return next(error);
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );
    return res
      .status(201)
      .json({
        accessToken,
        userId: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    err = new HttpError("Something went wrong!", 500);
    return next(err);
  }
};
