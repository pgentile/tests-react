import PropTypes from 'prop-types';
import React from 'react';

import Tab from './Tab';


export default function Tabs({children}) {
  // Create Tab links from children
  let tabIndex = 0;
  const tabTitles = React.Children.map(children, tab => {
    const { title, isActive, onTitleClick } = tab.props;

    let className='tabs-title';
    if (isActive) {
      className += ' is-active';
    }

    const onLinkClick = event => {
      event.preventDefault();
      if (onTitleClick) {
        onTitleClick();
      }
    }

    tabIndex++;
    return (
      <li key={tabIndex} className={className}>
        <a onClick={onLinkClick} aria-selected={isActive}>{title}</a>
      </li>
    );
  });

  return (
    <div>
      <ul className="tabs">
        {tabTitles}
      </ul>
      <div className="tabs-content">
        {children}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(Tab),
};
