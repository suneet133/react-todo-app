import React, { useContext } from 'react';

import { TodosContext } from '../context/TodosContext';

function FilterTodos() {
  const { filter, todos, setFilter, filterTodos } = useContext(TodosContext);

  return (
    <div className="tabs is-toggle">
      <ul>
        <li
          className={filter === 'All' ? 'is-active' : ''}
          onClick={() => {
            setFilter('All');
            filterTodos();
          }}
        >
          <a>
            <span className="icon is-small">
              <i className="fas fa-list" aria-hidden="true"></i>
            </span>
            <span>All</span>
          </a>
        </li>
        <li
          className={filter === 'Active' ? 'is-active' : ''}
          onClick={() => {
            setFilter('Active');
            filterTodos();
          }}
        >
          <a>
            <span className="icon is-small">
              <i className="fas fa-spinner" aria-hidden="true"></i>
            </span>
            <span>Active</span>
          </a>
        </li>
        <li
          className={filter === 'Completed' ? 'is-active' : ''}
          onClick={() => {
            setFilter('Completed');
            filterTodos();
          }}
        >
          <a>
            <span className="icon is-small">
              <i className="fas fa-check" aria-hidden="true"></i>
            </span>
            <span>Completed</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FilterTodos;
