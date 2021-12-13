import React, { useContext, useEffect, useRef, useState } from 'react';

import { TodosContext } from './context/TodosContext';

function TodoForm() {
  const [todoInput, setTodoInput] = useState('');
  const todoInputEl = useRef(null);

  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function getUniqueId() {
    return new Date().getTime();
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    // Add code here from context
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setIdForTodo(getUniqueId());

    setTodoInput('');
  }

  // Passing empty array means on component mounted;
  useEffect(() => {
    //focus on adding todo input element
    todoInputEl.current.focus();
  }, []);

  return (
    <div className="container">
      <form action="#" onSubmit={handleFormSubmit}>
        <input
          ref={todoInputEl}
          value={todoInput}
          onChange={handleInput}
          type="text"
          className="input"
          placeholder="what do you need to do?"
        />
      </form>
    </div>
  );
}

export default TodoForm;
