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
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onTitleClick: React.PropTypes.func,
};

Tab.defaultProps = {
  isActive: false,
};


function showIf(condition, element) {
  return condition ? element : null;
}
