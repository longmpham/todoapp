const express = require("express");
const cors = require("cors");
const TodoModel = require("./models/Todo"); 
const connectDB = require("./db")
const dotenv = require("dotenv").config();


const app = express();
app.use(express.json());
app.use("*", cors())

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

app.put('/updateTodo/:id', async (req, res) => {
  const { id } = req.params
  console.log(req.body)
  try {
    const todo = await TodoModel.findByIdAndUpdate({"_id": id}, { "action": req.body.action})
    res.send('updated: ' + id + ' : ' + req.body.action )
  } catch (error) {
    res.send(error)
  }
})

app.delete('/deleteTodo/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todo = await TodoModel.findOneAndDelete({"_id": id})
    res.send('deleted: '+ id)
  } catch (error) {
    console.log(error)
  }

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});