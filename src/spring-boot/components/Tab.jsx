import React from 'react';


export default function Tab({children, isActive, onClick}) {
  let className='tabs-title';
  if (isActive) {
    className += ' is-active';
  }

  const onLinkClick = event => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  }

  return (
    <li className={className}>
      <a onClick={onLinkClick} aria-selected={isActive}>{children}</a>
    </li>
  )
}

Tab.propTypes = {
  children: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
};

Tab.defaultProps = {
  isActive: false,
};
