const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountInstance = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 20 },
  bio: { type: String, maxLength: 300 },
  photo: { data: Buffer, contentType: String },
  joined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", AccountInstance);
