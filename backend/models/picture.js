const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  photo: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Picture", PictureSchema);
