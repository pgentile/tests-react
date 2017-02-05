import React from 'react';


export default class MetricName extends React.PureComponent {

  render() {
    const {name, metricNameFilter} = this.props;

    if (metricNameFilter) {
      const index = name.indexOf(metricNameFilter);
      if (index >= 0) {
        const start = name.substr(0, index);
        const match = name.substr(index, metricNameFilter.length);
        const end = name.substr(index + metricNameFilter.length);

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

MetricName.propTypes = {
  name: React.PropTypes.string.isRequired,
  metricNameFilter: React.PropTypes.string.isRequired,
};
