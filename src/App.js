import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [result, setresult] = useState("");
  const [newtodo, setnewTodo] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    if (newtodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length++, title: newtodo, completed: false },
      ]);
      setnewTodo("");
    } else {
      alert("Please enter a non-empty todo to add.");
    }
  };

  const complete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const results = () => {
    if (result === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (result === "incomplete") {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  };

  return (
    <div className="container">
      <h1>TODO APP</h1>
      <input
        type="text"
        placeholder="Add new task"
        value={newtodo}
        onChange={(e) => setnewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>

      <div className="btn1">
        <button className="btnss" onClick={() => setresult("all")}>
          Show All
        </button>
        <button className="btnss" onClick={() => setresult("completed")}>
          Show Complete
        </button>
        <button className="btnss" onClick={() => setresult("incomplete")}>
          Show Incomplete
        </button>
      </div>

      <div className="maincontetn">
        {results().map((todo) => (
          <div key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {todo.title}
            </span>
            <span className="btn">
              <button
                onClick={() =>
                  editTodo(todo.id, prompt("Edit Task", todo.title))
                }
              >
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="lastbtn" onClick={() => complete(todo.id)}>
                {todo.completed ? "Incomplete" : "Complete"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
