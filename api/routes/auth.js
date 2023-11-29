const router = require("express").Router();
const { body } = require("express-validator");

const authControllers = require("../controllers/auth");

router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Name should contain between 3 to 20 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email address"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("password should contain between 8 to 20 characters"),
  ],
  authControllers.postUser
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email address"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("password should contain between 8 to 20 characters"),
  ],
  authControllers.postLogin
);
module.exports = router;
