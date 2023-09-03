const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountControllers");

router.post("/", accountController.account_create_post);
router.put("/", accountController.account_update_post);
router.post("/login", accountController.account_login);

module.exports = router;
