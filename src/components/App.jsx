import '../App.css';
import { useEffect, useState } from 'react';
import NoTodo from './NoTodo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { func } from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from './context/TodosContext';

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
        <section className="section">
          <div className="container">
            <div className="box" style={{ width: 800 }}>
              <h1 className="subtitle">Todo App</h1>
              <hr></hr>
              <TodoForm addTodo={addTodo} />
              <hr></hr>
              <div className="content">
                {todos.length > 0 ? <TodoList /> : <NoTodo />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
