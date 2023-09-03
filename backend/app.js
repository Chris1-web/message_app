const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes/api");
const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/accounts", apiRouter);

app.listen(3000, () => {
  console.log("app listen at port 3000");
});
