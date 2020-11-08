import React from 'react';
import PropTypes from 'prop-types';

// Import the original component
import TodoM from '../../Todo';

function Todo(props) {
  return <TodoM {...props}/>
}

Todo.propTypes = {
  /**
   * If `true`, the todo will be marked as completed.
   */
  completed: PropTypes.bool,

  toggleTaskCompleted: PropTypes.func,
}

export default Todo;
