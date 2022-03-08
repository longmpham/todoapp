const express = require("express");
const cors = require("cors");
const TodoModel = require("./models/Todo"); 
const connectDB = require("./db")
const dotenv = require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors())

connectDB();

const port = 8000;

app.get('/', function(req, res) {
  res.send('Hello World!')
});


// all our api calls here for now.
// app.get("/getTodos", (request, response) => {
//   const todos = TodoModel.find({}, (error, result) => {
//     if (error) {
//       response.json(err)
//     }
//     else {
//       response.json(result)
//     }
//   })
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/getTodos", async (request, response) => {
  const todos = await TodoModel.find({});
  try {
    response.status(200).json(todos)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post("/createTodo", async (request, response) => {
  const todo = request.body;
  const newTodo = new TodoModel(todo);
  try {
    await newTodo.save();
    response.status(200).send(todo)
  } catch (error) {
    response.status(500).send(error);
  }
})

app.put('/updateTodo', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/deleteTodo', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});