const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountInstance = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 100 },
  password: { type: String, required: true },
  bio: { type: String, maxLength: 300 },
  photo: { type: Schema.Types.ObjectId, ref: "Photo" }, //The JWT token is too long with the buffer
  joined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", AccountInstance);
