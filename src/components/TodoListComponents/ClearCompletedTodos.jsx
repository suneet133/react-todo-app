import React from 'react';
import PropTypes from 'prop-types';

ClearCompletedTodos.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};

function ClearCompletedTodos(props) {
  return (
    <>
      <button className="button" onClick={() => props.clearCompleted()}>
        Clear completed
      </button>
    </>
  );
}

export default ClearCompletedTodos;
