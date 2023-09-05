const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageInstance = new Schema({
  text: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  image: { type: Schema.Types.ObjectId, ref: "Picture" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageInstance);
