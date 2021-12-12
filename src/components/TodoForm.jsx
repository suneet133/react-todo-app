import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { func } from 'prop-types';

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');
  const todoInputEl = useRef(null);

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodo(todoInput);

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
