const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://long:long@cluster0.enwkp.mongodb.net/learnmern?retryWrites=true&w=majority");

const port = 3005;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});