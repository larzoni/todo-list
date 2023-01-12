import React, { useState, useEffect, useRef } from "react";

// in short this code defines a form for adding new to-do items that has an input element, and when the form is submitted, it will create an object with a random id and the text entered in the input, then pass the object to the onSubmit prop function and clear the input field.
function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your todo"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputFocus}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputFocus}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;

//This is a functional component called TodoForm that renders a form for adding new to-do items to the list. It accepts a single prop called onSubmit which is a function that will be called when the form is submitted.

//TodoForm uses the useState hook to initialize and manage the state of the form input. It is using useState to initialize a state variable called input to an empty string and a function called setInput to update the input state value.

//The useRef hook is being used to create a reference to the input element. And it is being used inside the useEffect which will set the focus on the input element.

//handleChange function is taking the input value and updating the state with the current value and handleSubmit is preventing the default submit event and calling onSubmit prop function and passing an object with two properties, the id and text of the input field and then clears the input by setting the input state back to an empty string.
