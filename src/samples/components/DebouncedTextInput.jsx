import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export default class DebouncedTextInput extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps({ value: newValue }) {
    this.debouncedOnChange.cancel();
    this.setState({
      value: newValue,
    });
  }

  onChange = event => {
    const value = event.target.value;
    if (value) {
      event.persist();
      this.debouncedOnChange(event);
    } else {
      this.debouncedOnChange.cancel();
      this.props.onChange(event);
    }

    this.setState({
      value,
    });
  }

  debouncedOnChange = debounce(event => {
    this.props.onChange(event);
  }, 200);

  render() {
    return (
      <input {...this.props} value={this.state.value} onChange={this.onChange} />
    );
  }

}
