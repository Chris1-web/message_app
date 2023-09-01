const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.post("/accounts", (req, res) => {
  res.json({ message: "welcome" });
});

app.listen(3000, () => {
  console.log("app listen at port 3000");
});
