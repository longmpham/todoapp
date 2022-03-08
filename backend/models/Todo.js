const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
})

const TodoModel = mongoose.model("todo", TodoSchema)
module.exports = TodoModel