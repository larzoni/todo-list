import React, { useState } from "react";
import "../src/App.css";
import TodoList from "./components/TodoList";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="todo-app">
      <TodoList />
    </div>
  );
}

export default App;
