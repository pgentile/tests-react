import React from 'react';


export default function Tabs({children}) {
  return (
    <ul className="tabs">
      {children}
    </ul>
  )
}

Tabs.propTypes = {
  children: React.PropTypes.node.isRequired,
};
