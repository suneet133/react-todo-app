import React from 'react';
import PropTypes from 'prop-types';

TodoItemsRemaining.propTypes = {
  remaining: PropTypes.func.isRequired,
};

function TodoItemsRemaining(props) {
  return <>{props.remaining()} items remaining</>;
}

export default TodoItemsRemaining;
