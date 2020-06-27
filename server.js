const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "dist/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
