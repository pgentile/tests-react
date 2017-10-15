import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export default class DebouncedTextInput extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    debounceTimeout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    value: '',
    debounceTimeout: 200,
  };

  constructor(props) {
    super(props);

    this.debouncedOnChange = null;

    this.state = {
      value: props.value,
    };
  }

  updateDebouncedOnChange = () => {
    const { debounceTimeout, onChange } = this.props;

    console.debug('updateDebouncedOnChange...');

    if (this.debouncedOnChange) {
      this.debouncedOnChange.flush();
    }

    this.debouncedOnChange = debounce(event => {
      if (onChange) {
        onChange(event);
      }
    }, debounceTimeout);
  }

  componentDidMount() {
    this.updateDebouncedOnChange();
  }

  componentWillReceiveProps({ value: newValue, onChange: newOnChange, debounceTimeout: newDebounceTimeout }) {
    const { value, onChange, debounceTimeout } = this.props;

    if (value !== newValue) {
      console.info('Value prop changed, applying...');

      this.debouncedOnChange.flush();
      this.setState({
        value: newValue,
      });
    }

    if (onChange !== newOnChange || debounceTimeout !== newDebounceTimeout) {
      this.updateDebouncedOnChange();
    }
  }

  onChange = event => {
    const value = event.target.value;

    this.setState({
      value,
    });

    event.persist();
    this.debouncedOnChange(event);
  }

  render() {
    return (
      <input {...this.props} value={this.state.value} onChange={this.onChange} />
    );
  }

}
