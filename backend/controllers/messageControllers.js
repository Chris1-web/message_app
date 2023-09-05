const verifyToken = require("../verifyToken");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// models
const Account = require("../models/account");
const Message = require("../models/message");
const picture = require("../models/picture");

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
      const recipient = await Account.findById(recipientId);
      if (!recipient) throw new Error("User does not exist");

      let messagePicture = null;
      if (req.file) {
        imageObject = {
          url: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
        };
        messagePicture = new picture(imageObject);
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
    const { recipientId } = req.params;
    // get the particular user
    try {
      const friend = await Account.findById(recipientId);
      if (friend === null) throw new Error("User does not exist");
      // get all messages that have the sender as the current user and friend as recipient
      const messages = await Message.find({
        sender: req.user._id,
        recipient: recipientId,
      });
      return res.status(400).json({ messages });
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  },
];

exports.message_delete = [
  verifyToken,
  async (req, res) => {
    const { messageId } = req.params;
    try {
      // check if message's author is the current user
      const message = await Message.findOneAndDelete({
        _id: messageId,
        sender: req.user._id,
      });
      if (message === null) throw new Error("Forbidden");
      return res.status(200).json({ message: "Message Deleted" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
];
