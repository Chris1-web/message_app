const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageControllers");

router.delete("/:messageId", messageController.message_delete); // get a particular message and update , you have to be the author

module.exports = router;
