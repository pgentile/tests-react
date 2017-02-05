import React from 'react';


export default function TabPanel({children, isActive, addChildrenIfInactive}) {
  let className = 'tabs-panel';
  if (isActive) {
    className += ' is-active';
  }

  return (
    <div className={className} aria-hidden={!isActive}>
      {showIf(isActive || addChildrenIfInactive, children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: React.PropTypes.node.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  addChildrenIfInactive: React.PropTypes.bool.isRequired,
};

TabPanel.defaultProps = {
  isActive: false,
  addChildrenIfInactive: false,
};


function showIf(condition, element) {
  return condition ? element : null;
}
