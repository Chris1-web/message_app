const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  url: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Picture", PictureSchema);
