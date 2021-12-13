import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function CheckAllTodos() {
  const { todos, setTodos } = useContext(TodosContext);
  function checkAll() {
    const checkedAllTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(checkedAllTodos);
  }

  return (
    <>
      <button className="button" onClick={() => checkAll()}>
        Check all
      </button>
    </>
  );
}

export default CheckAllTodos;
