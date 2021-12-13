import '../App.css';
import { useEffect, useState } from 'react';
import NoTodo from './NoTodo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { func } from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  /* const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Do task 1',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Do task 2',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Do task 3',
      isComplete: false,
      isEditing: false,
    },
  ]); */

  function getUniqueId() {
    return new Date().getTime();
  }

  const [idForTodo, setIdForTodo] = useState(getUniqueId());

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function checkAll() {
    const checkedAllTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(checkedAllTodos);
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function filterTodos(filter) {
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
    <div className="App">
      <section className="section">
        <div className="container">
          <div className="box" style={{ width: 800 }}>
            <h1 className="subtitle">Todo App</h1>
            <hr></hr>
            <TodoForm addTodo={addTodo} />
            <hr></hr>
            <div className="content">
              {todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  completeTodo={completeTodo}
                  enableEditing={enableEditing}
                  updateTodos={updateTodos}
                  cancelEdit={cancelEdit}
                  deleteTodo={deleteTodo}
                  remaining={remaining}
                  checkAll={checkAll}
                  clearCompleted={clearCompleted}
                  filterTodos={filterTodos}
                />
              ) : (
                <NoTodo />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
