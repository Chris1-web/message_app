const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// model
const Account = require("../models/account");

exports.account_create_post = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape()
    .custom(async (value) => {
      const existingUser = await Account.findOne({ username: value });
      if (existingUser) {
        throw new Error("Username already exists");
      }
      return value;
    }),
  body("password", "Password is required")
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape(),
  body("confirm_password", "This field is required")
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return value;
    }),
  (req, res) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    // if there is an error is the form submitted, send error to API
    if (!errors.isEmpty()) {
      const results = errors.array();
      return res.status(400).json({ errors: results });
    }
    // if there are no errors, hash password and store in the database
    bcrypt.hash(password, 10, async function (error, hashedPassword) {
      try {
        const user = new Account({
          username,
          password,
          bio: null,
          photo: null,
          password: hashedPassword,
        });
        await user.save();
        res.json({ user, message: "User account created successfully" });
      } catch (error) {
        return res.status(500).json({ errors: error.errors });
      }
    });
  },
];
