const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoModel = require("./models/Todo"); 
const connectDB = require("./db")

app.use(express.json());
app.use(cors())

connectDB();

const port = 8000;

app.get('/', function(req, res) {
  res.send('Hello World!')
});


// all our api calls here for now.
app.get("/getTodos", (request, response) => {
  const todos = TodoModel.find({}, (error, result) => {
    if (error) {
      response.json(err)
    }
    else {
      response.json(result)
    }
  })
});

// app.get("/getTodos", async (request, response) => {
//   const todos = await TodoModel.find({});
//   try {
//     response.status(200).json(err)
//   } catch (error) {
//     response.status(500).send(error)
//   }
// })

app.post("/createTodo", async (request, response) => {
  const todo = request.body;
  const newTodo = new TodoModel(todo);
  try {
    await newTodo.save();
  } catch (error) {
    // response.json(todo);
    response.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});