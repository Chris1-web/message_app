const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountPhotoInstance = new Schema({
  url: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("AccountPhoto", AccountPhotoInstance);
