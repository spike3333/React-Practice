import React, { useEffect, useState } from "react";
import "./todolist.css";

const TodoList = () => {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");

    if (storedTodos !== null) {
      try {
        setTodo(JSON.parse(storedTodos)); // Safely parse and set state
      } catch (error) {
        console.error("Error parsing stored todos:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0 ) {
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  const handleAddToDO = () => {
    if (input.trim() === "") return;
    setTodo([...todos, { text: input, checked: false, deleted: false }]);
    console.log(todos);
    setInput("");
  };

  const handleCheckBoxChange = (index) => {
    const updatedTodo = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    console.log(updatedTodo);

    setTodo(updatedTodo);
    console.log(updatedTodo);
  };

  const handleDelete = (index) => {
    // const deletedTodo = todos.map((todo, i) =>
    //   i === index ? { ...todo, deleted: !todo.deleted } : todo
    // );

    const filterdTodo = todos.filter((todo, i) => i !== index);
    console.log(todos);
    setTodo(filterdTodo);
  };

  const handleClearToDO=()=>{
    
    setTodo([]);
    localStorage.removeItem("todo");
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>TO DO LIST</h1>

      <div className="to_do_div">
        <input
          className="to_do_input"
          type="text"
          placeholder="Add your task..."
          value={input}
          onChange={handleInputChange}
        ></input>
        <button onClick={handleAddToDO}>Add To Do</button>
        <button onClick={handleClearToDO}>Clear To Do</button>
      </div>

      <div className="to_do_list">
        <ul className = "todo-list">
          {todos.map((todo, index) => (
            <li className="todo-item"
              key={index}
              style={{
                textDecoration: todo.deleted ? "line-through" : "none",
                color: todo.checked ? "green" : "orange",
                fontWeight: todo.checked ? "bold" : "normal",
                backgroundColor: "lightgray",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <input
                type="checkbox" checked = {todo.checked}
                onChange={() => handleCheckBoxChange(index)}
              />{" "}
                <span className="todo-text">{todo.text}</span>
              <button style={{margin:"5px"}}>Edit</button>{" "}
              <button style={{margin:"5px"}}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
