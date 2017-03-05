import React from 'react';


export default class EnvFilterForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onEnvFilterChange = this.onEnvFilterChange.bind(this);
  }

  onEnvFilterChange(event) {
    event.preventDefault();
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
          type="text"
          placeholder="Fiter by env property name"
          value={this.props.envFilter}
          onChange={this.onEnvFilterChange} />
    );
  }

}

EnvFilterForm.propTypes = {
  envFilter: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
