import React, { useState, useMemo } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import "../App.css";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [filter, setFilter] = useState("all");
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((t) => !t.isCompleted);
      case "completed":
        return todos.filter((t) => t.isCompleted);
      default:
        return todos;
    }
  }, [todos, filter]);

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  //we map through the todos
  return filteredTodos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;

// This code defines a functional React component called Todo that displays a list of to-do items. The component receives several props:

// todos: an array of to-do items
// completeTodo: a function to handle marking a to-do item as completed
// removeTodo: a function to handle removing a to-do item
// updateTodo: a function to handle updating a to-do item.
// The component uses the useState and useMemo hooks to manage its state and improve performance.

// It uses useState to keep track of two pieces of state:

// filter, a string that can be "all", "active", "completed" and will be used to filter to-dos list
// edit, an object that contains id and value properties, that will be used to keep track of the to-do item that is being edited, if any.
// useMemo is used to create a variable filteredTodos that will keep a filtered version of the todos array based on the filter state variable, it is a optimized version of the todos list so that it only gets recalculated when the filter or todos list is updated.

// The component has a condition that checks if the edit.id variable is truthy, if so, it returns TodoForm component which has the functionality to edit the todo and pass the value to the submitUpdate function to update
