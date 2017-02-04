import React from 'react';


export default function TabContent({children}) {
  return (
    <div className="tabs-content">
      {children}
    </div>
  )
}

TabContent.propTypes = {
  children: React.PropTypes.node.isRequired,
};
