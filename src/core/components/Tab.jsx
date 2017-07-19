import PropTypes from 'prop-types';
import React from 'react';


export default function Tab({children, isActive}) {
  let className = 'tabs-panel';
  if (isActive) {
    className += ' is-active';
  }

  return (
    <div className={className} aria-hidden={!isActive}>
      {showIf(isActive, children)}
    </div>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  onTitleClick: PropTypes.func,
};

Tab.defaultProps = {
  isActive: false,
};


function showIf(condition, element) {
  return condition ? element : null;
}
