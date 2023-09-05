const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountControllers");

router.post("/", accountController.account_create_post);
router.put("/", accountController.account_update_post); //can only update your own account
router.get("/:username", accountController.account_individual_get);
router.post("/login", accountController.account_login);

module.exports = router;
