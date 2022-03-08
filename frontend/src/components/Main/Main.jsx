import React from 'react'
import "./Main.css"

const Main = () => {

  const [todoList, setTodoList] = React.useState([])
  const [newTodo, setNewTodo] = React.useState("")
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/getTodos");
      const data = await response.json();
      setTodoList(data)
      console.log(data)
    }
    fetchData();
    // if (todoList.length && !alert) {
    //   fetchData()
    // }
  },[alert])

  React.useEffect(() => {
    console.log("your data you're sending is: " + newTodo)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "action": newTodo })
    }
    const postTodo = async () => { 
      try {
        const response = await fetch("http://localhost:8000/createTodo", requestOptions)
        const data = await response.json();
        console.log(data)
        setAlert(true)
        setNewTodo("")
        // alert(false)
      } catch (error) {
        console.log(error)
      }      
    }
    postTodo();
  },[newTodo])

  React.useEffect(() => {
    if(alert) {
      setTimeout(() => {
        setAlert(false)
      }, 1000)
    }
  },[alert])

  const handleClick = () => {
    // delete todo api call!
    console.log("i click todo")
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const inputText = event.target.value
      console.log('enter key hit, value: '+ inputText)
      setNewTodo(inputText)
    }
  }


  return (
    <div>
      <div className="main-window">
        <h3 className="main-title">TODO LIST WITH MERN! WOO WOO</h3>
        <ul>
          {todoList.map(todo => (
            <li key={todo.id} className="main-list-item">{todo.action}
              <button className="main-list-button" onClick={handleClick}></button>
            </li>
          ))}
          { !alert ? <input className="main-list-item-input" type="text" name="input" onKeyPress={handleKeyPress} placeholder="New task..."></input> :
          <h3>SUBMITTED</h3>
          }
        </ul>
      </div>
    </div>
  )
}

export default Main