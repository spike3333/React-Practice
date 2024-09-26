import React, { useEffect, useState } from "react";
import "./todolist.css";
import { PiTrashSimpleLight } from "react-icons/pi";
import { LuPenSquare } from "react-icons/lu";
import { MdOutlineCleaningServices } from "react-icons/md";
import { PiNotepadDuotone } from "react-icons/pi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const TodoList = () => {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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
    if (todos.length > 0) {
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  const handleAddToDO = () => {
    if (input.trim() === ""){
      alert("Please enter a valid task!");
      return;
    } 
    setTodo([...todos, { text: input, checked: false, deleted: false }]);
    console.log(todos);
    setInput("");
    alert("Todo Added!");
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
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if(confirmDelete){
      const filterdTodo = todos.filter((todo, i) => i !== index);
      console.log(todos);
      setTodo(filterdTodo);
      alert("To Do Deleted!")
    }
  };

  const handleClearToDO = () => {
    setTodo([]);
    localStorage.removeItem("todo");
    alert("Todo List Cleared!");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    console.log(editIndex);
    const valueToBeEdited = todos[index];
    console.log(valueToBeEdited);
    setInput(valueToBeEdited.text);
  };

  const handleUpdateToDo = () => {
    const updateData = todos.map((todo, index)=>(
    editIndex === index ? {...todo, text:input} : todo
    ))

    setTodo(updateData);
    setInput("");
    setEditIndex(null);
    alert("Todo Updated!");
  };
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
        {editIndex !== null ? (
          <button onClick={handleUpdateToDo}> <LuPenSquare style={{color:"#ff6808", fontSize:"20px"}}/> Update To Do</button>
          
        ) : (
          <button onClick={handleAddToDO}><PiNotepadDuotone style={{color:"green", fontSize:"20px"}} />Add To Do</button>
        )}
        <button onClick={handleClearToDO}><MdOutlineCleaningServices style={{color:"skyblue", fontSize:"20px"}} />Clear To Do</button>
      </div>

      <div className="to_do_list">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li
              className="todo-item"
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
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={todo.checked}
                onChange={() => handleCheckBoxChange(index)}
              />
              <span className="todo-text">{todo.text} {todo.checked ? <span style={{color:"#a657ab", marginLeft:"10px", fontSize:"15px"}}>Milestone Achieved <MdOutlineDoneOutline /></span> : <span></span>}</span> 
              <button disabled={todo.checked && "disabled"}
                style={{ margin: "5px" }}
                onClick={() => {
                  handleEdit(index);
                }}
              >
                <LuPenSquare style={{color:"#ff6808", fontSize:"20px"}}/>Edit
              </button>
              <button
                style={{ margin: "5px" }}
                onClick={() => {
                  handleDelete(index);
                }}
              >
               <PiTrashSimpleLight style={{color:"red", fontSize:"20px"}} /> Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
