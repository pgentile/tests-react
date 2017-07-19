import PropTypes from 'prop-types';
import React from 'react';


export default class EnvPropertyName extends React.PureComponent {

  render() {
    const {name, envFilter} = this.props;

    if (envFilter) {
      const index = name.indexOf(envFilter);
      if (index >= 0) {
        const start = name.substr(0, index);
        const match = name.substr(index, envFilter.length);
        const end = name.substr(index + envFilter.length);

        return (
          <code>
            {start}
            <span style={{backgroundColor: 'yellow'}}>{match}</span>
            {end}
          </code>
        );
      }
    }

    return (
      <code>{name}</code>
    );
  }

}

EnvPropertyName.propTypes = {
  name: PropTypes.string.isRequired,
  envFilter: PropTypes.string.isRequired,
};
