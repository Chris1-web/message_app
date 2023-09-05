const { body, validationResult } = require("express-validator");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const storage = multer.memoryStorage();
const verifyToken = require("../verifyToken");
const upload = multer({ storage });

// model
const Account = require("../models/account");
const AccountPhoto = require("../models/accountPhoto");
const Message = require("../models/message");
const Picture = require("../models/picture");

exports.account_create_post = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape()
    .custom(async (value) => {
      const existingUser = await Account.findOne({
        username: value,
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
      const user = await Account.findOne({ username: username });
      if (!user) throw new Error("User does not exist");
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) throw new Error("Incorrect password");

      // create a token to be used in consecutive requests
      const token = jwt.sign({ user }, process.env.JWT_KEY, {
        expiresIn: "7h",
      });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  },
];

exports.account_update_post = [
  verifyToken,
  body("bio").trim().escape(),
  upload.single("photo"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { bio } = req.body;
    // if there is no file, just update bio
    try {
      if (!req.file && bio) {
        const user = {
          ...req.user,
          bio,
        };
        // update req.user
        req.user = user;
        await Account.findOneAndUpdate({ username: req.user.username }, user);
        return res.json({ user });
      }

      // if there is an image file, create an AccountPhoto model and reference the ID
      const imageObject = {
        url: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      };
      const profilePhoto = new AccountPhoto(imageObject);

      await profilePhoto.save();

      const user = {
        ...req.user,
        bio,
        photo: profilePhoto._id,
      };
      // update req.user and token
      req.user = user;
      await Account.findOneAndUpdate({ username: req.user.username }, user);
      return res.json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
];

exports.account_individual_get = [
  verifyToken,
  // check account in database
  async (req, res) => {
    const { username } = req.params;
    try {
      const user = await Account.findOne({
        username,
      }).select("-password");
      if (user === null) {
        //if user is null
        throw new Error("User not found");
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  },
];

exports.accounts_list = [
  verifyToken,
  async (req, res) => {
    try {
      const users = await Account.find({})
        .select("-password")
        .select("-bio")
        .select("-joined");
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
];

exports.message_create = [
  verifyToken,
  body("text").trim().escape(),
  upload.single("picture"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { recipientId } = req.params;
    const { text } = req.body;
    try {
      // check if user exists in database
      const recipient = await Account.findOne({ _id: recipientId });
      console.log({ recipient, recipientId });
      if (!recipient) throw new Error("User does not exist");

      let messagePicture = null;
      if (req.file) {
        imageObject = {
          url: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
        };
        messagePicture = new Picture(imageObject);
        await messagePicture.save();
      }
      // check if file exists
      const message = new Message({
        text,
        sender: req.user._id,
        recipient: recipientId,
        image: messagePicture ? messagePicture._id : null,
      });

      await message.save();
      return res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
    }
  },
];

exports.messages_get = [
  verifyToken,
  async (req, res) => {
    const { accountId } = req.params;
    // get the particular user
    try {
      const friend = await Account.findById(accountId);
      if (friend === null) throw new Error("User does not exist");
      // get all messages that have the sender as the current user and friend as recipient
      const messages = await Message.find({
        sender: req.user._id,
        recipient: accountId,
      });
      return res.status(400).json({ messages });
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  },
];
