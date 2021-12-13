import React, { useContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import TodoItemsRemaining from './TodoListComponents/TodoItemsRemaining';
import CheckAllTodos from './TodoListComponents/CheckAllTodos';
import ClearCompletedTodos from './TodoListComponents/ClearCompletedTodos';
import FilterTodos from './TodoListComponents/FilterTodos';
import useToggle from '../hooks/useToggle';
import { TodosContext } from './context/TodosContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TodoList() {
  const { filterTodos, todos, setTodos } = useContext(TodosContext);
  const [footerVisible, setFooterVisible] = useToggle(true);

  function deleteTodo(id) {
    console.log('Deleting todo id: ' + id);
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function enableEditing(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function updateTodos(event, id) {
    const updateTodo = todos.map(todo => {
      if (event.target.value.trim().length === 0) {
        todo.isEditing = false;
        return todo;
      }
      if (todo.id === id) {
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updateTodo);
  }

  function cancelEdit(id) {
    const updateTodo = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updateTodo);
  }

  return (
    <div>
      <TransitionGroup component="ul" className="todo-list">
        {filterTodos().map((todo, index) => (
          <CSSTransition
            key={todo.id}
            classNames="slide-horizontal"
            timeout={300}
          >
            <li>
              <div className="columns is-mobile">
                <div className="column is-1">
                  <input
                    type="checkbox"
                    onChange={() => completeTodo(todo.id)}
                    checked={todo.isComplete ? true : false}
                  />
                </div>
                <div className="column">
                  {!todo.isEditing && (
                    <span
                      onDoubleClick={() => enableEditing(todo.id)}
                      className={`subtitle is-5 ${
                        todo.isComplete ? 'line-through' : ''
                      }`}
                    >
                      {todo.title}
                    </span>
                  )}
                  {todo.isEditing && (
                    <input
                      onBlur={event => updateTodos(event, todo.id)}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          updateTodos(event, todo.id);
                        } else if (event.key === 'Escape') {
                          cancelEdit(todo.id);
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
                    onClick={() => deleteTodo(todo.id)}
                    className="icon is-medium"
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <hr />
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button
            className="button is-small is-pulled-right"
            onClick={setFooterVisible}
          >
            {footerVisible ? 'hide' : 'show'}
          </button>
        </p>
      </div>
      <CSSTransition
        in={footerVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <>
          <div className="columns is-vcentered is-mobile">
            <div className="column" style={{ marginLeft: '2rem' }}>
              <CheckAllTodos />
            </div>
            <div className="column">
              <span className="is-pulled-right">
                <TodoItemsRemaining />
              </span>
            </div>
          </div>
          <hr />
          <div className="columns is-vcentered is-mobile">
            <div className="column">
              <FilterTodos />
            </div>
            <div className="column">
              <span className="is-pulled-right">
                <ClearCompletedTodos />
              </span>
            </div>
          </div>
        </>
      </CSSTransition>
    </div>
  );
}

export default TodoList;
