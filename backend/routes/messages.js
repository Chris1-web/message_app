const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageControllers");

router.post("/:recipientId", messageController.message_create);

module.exports = router;
