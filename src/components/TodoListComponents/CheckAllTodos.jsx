import React from 'react';
import propTypes from 'prop-types';

CheckAllTodos.propTypes = {
  remaining: propTypes.func.isRequired,
  checkAll: propTypes.func.isRequired,
};

function CheckAllTodos(props) {
  return (
    <>
      <button
        className="button"
        onClick={() => props.checkAll()}
        disabled={props.remaining() === 0}
      >
        Check all
      </button>
    </>
  );
}

export default CheckAllTodos;
