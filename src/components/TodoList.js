import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

//The code is a functional React component that uses the useState hook to manage the state of a list of to-do items.

function TodoList() {
  const [todos, setTodos] = useState([]);

  //addTodo: It takes a new to-do item and adds it to the beginning of the list, but only if the text is present and not empty or whitespace-only.
  const addTodo = (todo, completeTodo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  //updateTodo: It takes an existing to-do item's ID and new values and updates that item in the list accordingly, but only if the text is present and not empty or whitespace-only. It uses a callback function passed to setTodos method to check which item to update. Both these functions are used to update the list of to-dos.

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //removeTodo function takes an id as parameter, creates a new array "removeArr" that contains all the todos except the one that has the id passed as parameter by using the filter method. And it update the state by calling the setTodos function with the new removeArr created.
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  //completeTodo function takes an id as parameter. It creates a new array "updatedTodos" by mapping through the original array of todos and finding the todo object which id matches the id passed as parameter, then it toggles the isComplete property of that object. Finally it updates the state with new updatedTodos.
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Save the to-dos to local storage
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Delete the to-dos from local storage
  const deleteTodos = () => {
    localStorage.removeItem("todos");
    setTodos([]);
  };

  return (
    <div>
      <h1>Things to do:</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <button onClick={saveTodos}>Save</button>
      <button onClick={deleteTodos}>Delete</button>
    </div>
  );
}

export default TodoList;

//props is an object that contains all of the properties passed to the component when it is used in the JSX. So, in this case, the TodoForm component is expecting to receive a single prop called onSubmit and it is destructured from the props object and passed to the function.

//This is a common pattern when creating functional components in React. It allows the component to access its properties via the props object, which is passed as an argument to the component's function.

//This way when we use TodoForm in JSX like <TodoForm onSubmit={addTodo} />, the onSubmit prop is passed to the TodoForm component and can be accessed via props object inside the TodoForm component.

//___________Tell me more about this!
//In class-based components, props can be accessed via the this.props object, but in functional components, it is passed as an argument to the function.

//The purpose of props is to pass data from a parent component to its child components. This way you can make the child component reusable and the parent component control the data that the child component will render.
//___________
