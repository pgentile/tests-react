import React from 'react';

import ComponentStatus from './ComponentStatus';


export default function ComponentsHealth({components}) {
  if (components.length === 0) {
    return null;
  }

  const rows = components.map((component, index) => {
    return (
      <tr key={index}>
        <td>{component.name}</td>
        <td><ComponentStatus status={component.status} /></td>
        <td><span>Show details&hellip;</span></td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Status</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

ComponentsHealth.propTypes = {
  components: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
