import React from "react";
import "./Main.css";

const Main = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const [updateID, setUpdateID] = React.useState("");
  const [updateText, setUpdateText] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/getTodos");
      const data = await response.json();
      setTodoList(data);
      // console.log(data)
    };
    fetchData();
  }, [alert]);

  React.useEffect(() => {
    if (newTodo === "") return;
    console.log("your data you're sending is: " + newTodo);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: newTodo }),
    };
    const postTodo = async () => {
      try {
        setAlert(true);
        const response = await fetch(
          "http://localhost:8000/createTodo",
          requestOptions
        );
        const data = await response.json();
        console.log("post success");

        setNewTodo("");
        // alert(false)
      } catch (error) {
        console.log(error);
      }
    };
    postTodo();
  }, [newTodo]);

  React.useEffect(() => {
    if (updateID === "") return;
    if (!alert) return;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: updateText }),
    };
    const updateTodo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/updateTodo/${updateID}`,
          requestOptions
        );
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.log("failed to catch error: " + error);
      }
    };
    updateTodo();
  }, [alert]);

  React.useEffect(() => {
    if (deleteID === "") return;
    const requestOptions = {
      method: "DELETE",
      // headers: { "Content-Type": "application/json" },
    };
    const deleteTodo = async () => {
      try {
        // console.log(deleteID)
        const response = await fetch(
          `http://localhost:8000/deleteTodo/${deleteID}`,
          requestOptions
        );
        const data = await response.text();
        console.log(data);
        setAlert(true);
      } catch (error) {
        console.log(error);
      }
    };
    deleteTodo();
  }, [deleteID]);

  React.useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 100);
    }
  }, [alert]);

  const handleUpdateClick = (event) => {
    setUpdateID(event.target.name);
    setIsUpdate((prevIsUpdate) => !isUpdate);
    setUpdateText(() => {
      const indexFound = todoList.findIndex((x) => x._id == event.target.name);
      console.log(todoList[indexFound].action);
      return todoList[indexFound].action;
    });
  };

  const handleUpdateSubmit = (event) => {
    setIsUpdate((prevIsUpdate) => !isUpdate);
    console.log(event.target);
    setAlert(true);
  };
  const handleDeleteClick = (event) => {
    // upgraded to handle div of <p> and the button to delete
    if (event === null) return;
    else {
      try {
        if (event.target.name === null) {
          console.log("not null");
          return;
        } else {
          setDeleteID(event.target.name);
        }
      } catch (error) {
        setDeleteID(event);
      }
    }

    // console.log(event.target);
    // setDeleteID(event.target.name);
  };

  const handleOnChange = (event) => {
    // console.log(event.target.value)
    // save every 10s
    // setTimeout(() => {
    //   setUpdateText(event.target.value)
    // }, 10000)
    setUpdateText(event.target.value);
  };

  const handleNewTodoKeyPress = (event) => {
    if (event.key === "Enter") {
      const inputText = event.target.value;
      console.log("enter key hit, value: " + inputText);
      setNewTodo(inputText);
    }
  };

  return (
    <div>
      <div className="main-window">
        <h3 className="main-title">TODO LIST WITH MERN! WOO WOO</h3>
        {isUpdate ? (
          <div className="main-window-edit">
            <textarea
              className="main-item-edit"
              type="text"
              name="input"
              placeholder="So you want to change your task..."
              defaultValue={updateText}
              onChange={handleOnChange}
            ></textarea>
            <button
              name={updateID}
              className="main-item-button"
              onClick={handleUpdateSubmit}
            >
              Update
            </button>
          </div>
        ) : (
          <ul>
            {todoList.map((todo) => (
              <li key={todo._id} className="main-list">
                <p
                  className="main-list-text"
                  name={todo._id}
                  onClick={() => handleDeleteClick(todo._id)}
                >
                  {todo.action}
                </p>
                <div className="main-list-buttons">
                  <button
                    name={todo._id}
                    className="main-list-button-edit"
                    onClick={handleUpdateClick}
                  ></button>
                  <button
                    name={todo._id}
                    className="main-list-button-delete"
                    onClick={handleDeleteClick}
                  ></button>
                </div>
              </li>
            ))}
            {alert ? (
              <h3>SUBMITTED</h3>
            ) : (
              <input
                className="main-list-item-input"
                type="text"
                name="input"
                onKeyPress={handleNewTodoKeyPress}
                placeholder="New task..."
              ></input>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;
