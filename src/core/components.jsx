import PropTypes from 'prop-types';
import React from 'react';


export function InputGroup({children}) {
  return (
    <div className="input-group">
      {children}
    </div>
  )
}

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
};



export function InputGroupField({children}) {
  return (
    <div className="input-group-field">
      {children}
    </div>
  )
}

InputGroupField.propTypes = {
  children: PropTypes.node.isRequired,
};
