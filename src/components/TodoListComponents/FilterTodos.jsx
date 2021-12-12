import React from 'react';
import PropTypes from 'prop-types';

FilterTodos.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

function FilterTodos(props) {
  return (
    <div class="tabs is-toggle">
      <ul>
        <li
          className={props.filter === 'All' ? 'is-active' : ''}
          onClick={() => {
            props.setFilter('All');
            props.filterTodos(props.filter);
          }}
        >
          <a>
            <span class="icon is-small">
              <i class="fas fa-list" aria-hidden="true"></i>
            </span>
            <span>All</span>
          </a>
        </li>
        <li
          className={props.filter === 'Active' ? 'is-active' : ''}
          onClick={() => {
            props.setFilter('Active');
            props.filterTodos(props.filter);
          }}
        >
          <a>
            <span class="icon is-small">
              <i class="fas fa-spinner" aria-hidden="true"></i>
            </span>
            <span>Active</span>
          </a>
        </li>
        <li
          className={props.filter === 'Completed' ? 'is-active' : ''}
          onClick={() => {
            props.setFilter('Completed');
            props.filterTodos(props.filter);
          }}
        >
          <a>
            <span class="icon is-small">
              <i class="fas fa-check" aria-hidden="true"></i>
            </span>
            <span>Completed</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FilterTodos;
