import PropTypes from 'prop-types';
import React from 'react';

import Tab from './Tab';


export default class Tabs extends React.Component {

  static propTypes = {
    onTitleClick: PropTypes.func,
    children: PropTypes.arrayOf(Tab),
  };

  onLinkClick = event => {
    const { onTitleClick } = this.props;

    event.preventDefault();
    if (onTitleClick) {
      onTitleClick();
    }
  }

  render() {
    const { children } = this.props;

    // Create Tab links from children
    const tabTitles = React.Children.map(children, (tab, index) => {
      const { title, isActive } = tab.props;

      let className = 'tabs-title';
      if (isActive) {
        className += ' is-active';
      }

      return (
        <li key={index} className={className}>
          <a onClick={this.onLinkClick} aria-selected={isActive}>{title}</a>
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

}
