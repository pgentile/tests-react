import React from 'react';


export default function TabPanels({children}) {
  return (
    <div className="tabs-content">
      {children}
    </div>
  )
}

TabPanels.propTypes = {
  children: React.PropTypes.node.isRequired,
};
