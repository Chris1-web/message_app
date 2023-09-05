const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageControllers");

router.post("/:recipientId", messageController.message_create); //send a message to a friend
router.get("/:recipientId", messageController.messages_get); //get all messages to a particular friend,(pagination involved)
router.delete("/:messageId", messageController.message_delete); // get a particular message and update , you have to be the author

module.exports = router;
