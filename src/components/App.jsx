import '../App.css';
import { useEffect, useState } from 'react';
import NoTodo from './NoTodo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { func } from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from './context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('All');
  const [idForTodo, setIdForTodo] = useState();

  function addTodo(todo) {}

  function filterTodos() {
    if (filter === 'All') {
      return todos;
    } else if (filter === 'Active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'Completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  // use effect can be used when something in todos list changes like this:
  /* useEffect(() => {
    console.log('todo list updated');

    return function cleanup() {
      console.log('This function can be used to clean up after the effect');
    };
  }, [todos]); */

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        filter,
        setFilter,
        filterTodos,
      }}
    >
      <div className="App">
        <section className="hero is-light is-fullheight-with-navbar">
          <div className="hero-body">
            <div
              className="container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="box" style={{ width: 800 }}>
                <h1 className="subtitle has-text-info">Todo App</h1>
                <hr></hr>
                <TodoForm addTodo={addTodo} />
                <hr></hr>
                <div className="content">
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={todos.length > 0}
                      timeout={300}
                      classNames="slide-vertical"
                      unmountOnExit
                    >
                      <>{todos.length > 0 ? <TodoList /> : <NoTodo />}</>
                    </CSSTransition>
                  </SwitchTransition>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
