import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import TodoItemsRemaining from './TodoListComponents/TodoItemsRemaining';
import CheckAllTodos from './TodoListComponents/CheckAllTodos';
import ClearCompletedTodos from './TodoListComponents/ClearCompletedTodos';
import FilterTodos from './TodoListComponents/FilterTodos';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  enableEditing: PropTypes.func.isRequired,
  updateTodos: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

function TodoList(props) {
  const [filter, setFilter] = useState('All');

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {props.filterTodos(filter).map((todo, index) => (
          <li key={todo.id}>
            <div className="columns">
              <div className="column is-1">
                <input
                  type="checkbox"
                  onChange={() => props.completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
              </div>
              <div className="column">
                {!todo.isEditing && (
                  <span
                    onDoubleClick={() => props.enableEditing(todo.id)}
                    className={`subtitle is-5 ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
                {todo.isEditing && (
                  <input
                    onBlur={event => props.updateTodos(event, todo.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        props.updateTodos(event, todo.id);
                      } else if (event.key === 'Escape') {
                        props.cancelEdit(todo.id);
                      }
                    }}
                    className="input"
                    type="text"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <div className="column is-1">
                <span
                  onClick={() => props.deleteTodo(todo.id)}
                  className="icon is-medium"
                >
                  <i className="fas fa-times"></i>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <div className="columns is-vcentered">
        <div className="column">
          <CheckAllTodos
            remaining={props.remaining}
            checkAll={props.checkAll}
          />
        </div>
        <div className="column">
          <span className="is-pulled-right">
            <TodoItemsRemaining remaining={props.remaining} />
          </span>
        </div>
      </div>
      <hr />
      <div className="columns is-vcentered">
        <div className="column">
          <FilterTodos
            filter={filter}
            filterTodos={props.filterTodos}
            setFilter={setFilter}
          />
        </div>
        <div className="column">
          <span className="is-pulled-right">
            <ClearCompletedTodos clearCompleted={props.clearCompleted} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
