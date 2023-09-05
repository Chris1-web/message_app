const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountControllers");

// accounts
router.post("/", accountController.account_create_post);
router.put("/", accountController.account_update_post); //can only update your own account
router.get("/", accountController.accounts_list); //get list of all accounts
router.post("/:recipientId/messages", accountController.message_create); //send message to a friend
router.get("/:accountId/messages", accountController.messages_get); //get all messages to a particular friend
router.get("/:username", accountController.account_individual_get);
router.post("/login", accountController.account_login);

module.exports = router;
