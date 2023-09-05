const verifyToken = require("../verifyToken");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// models
const Message = require("../models/message");

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
