import React from 'react'
import "./Main.css"

const Main = () => {

  const [todoList, setTodoList] = React.useState([])
  // i need to call the db and then put it in the state as default.
  React.useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/getTodos");
      const data = await response.json();
      setTodoList(data)
      console.log(data)
    }
    fetchData()
  },[])

  const handleClick = () => {
    // delete todo api call!
    console.log("i click todo")
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log('enter key hit')
    }
    
  }

  return (
    <div>
      <div className="main-window">
        <h3 className="main-title">TODO LIST WITH MERN! WOO WOO</h3>
        <ul>
          {todoList.map(todo => (
            <li className="main-list-item">{todo.action}
              <button className="main-list-button" onClick={handleClick}></button>
            </li>
          ))}
          <input className="main-list-item-input" name="input" onKeyPress={handleKeyPress} placeholder="New task..."></input>
        </ul>
      </div>
    </div>
  )
}

export default Main