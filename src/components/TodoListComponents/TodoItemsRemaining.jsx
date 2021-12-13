import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  return <>{remaining()} items remaining</>;
}

export default TodoItemsRemaining;
