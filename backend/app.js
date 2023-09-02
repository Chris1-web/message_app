const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors());

app.post("/accounts", (req, res) => {
  res.json({ message: "welcome" });
});

app.listen(3000, () => {
  console.log("app listen at port 3000");
  console.log(process.env.MONGODB_URL);
});
