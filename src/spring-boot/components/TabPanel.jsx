import React from 'react';


export default function TabPanel({children, isActive}) {
  let className='tabs-panel';
  if (isActive) {
    className += ' is-active';
  }

  if (isActive) {
    return (
      <div className={className} aria-hidden={false}>
        {children}
      </div>
    );
  } else {
    return (
      <div className={className} aria-hidden={true}></div>
    );
  }
}

TabPanel.propTypes = {
  children: React.PropTypes.node.isRequired,
  isActive: React.PropTypes.bool.isRequired,
};

TabPanel.defaultProps = {
  isActive: false,
};
