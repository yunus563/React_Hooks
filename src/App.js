// ^^^^Imports
import React, { useState, useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { Context } from "./Context";
import reducer from "./reducer";

// ^^^^Exports
export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodos = (event) => {
    if (event.key === "Enter") {
      dispatch({ 
        type: "add",
        payload: todoTitle,
      });
      setTodoTitle("");
    }
  };

  // ^^^^Return
  return (
    <Context.Provider value={{ dispatch }}>
      <div className="container">
        <h1>Todo app</h1>
        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
            onKeyPress={addTodos}
          />
          <label>Todo name</label>
        </div>
        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
