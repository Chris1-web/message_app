const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// model
const Account = require("../models/account");

exports.account_create_post = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape()
    .custom(async (value) => {
      const existingUser = await Account.findOne({
        username: value.toLowerCase(),
      });
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

exports.account_login = [
  body("username", "Username is required").trim().isLength({ min: 1 }).escape(),
  body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user exists in database and password is correct
      const user = await Account.findOne({ username: username.toLowerCase() });
      if (!user) throw new Error("User does not exist");
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) throw new Error("Incorrect password");

      // create a token to be used in consecutive requests
      const token = jwt.sign({ user }, process.env.JWT_KEY, {
        expiresIn: "7h",
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: { message: error.message } });
    }
  },
];
