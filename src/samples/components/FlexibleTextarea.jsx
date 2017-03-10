import React from 'react';


export default class FlexibleTextarea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: getRows(props),
    };

    this.onTextareaChange = this.onTextareaChange.bind(this);
  }

  render() {
    return (
      <textarea {...this.state} {...this.props} onChange={this.onTextareaChange} />
    );
  }

  onTextareaChange(event) {
    this.props.onChange(event);

    this.setState((prevState, props) => ({
      rows: getRows(props),
    }));
  }

}

FlexibleTextarea.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  minRows: React.PropTypes.number,
};


function getRows(props) {
  return Math.max(countLines(props.value), props.minRows || 3);
}


function countLines(value) {
  if (value) {
    return (value.match(/\n/g) || []).length + 1;
  }

  return 0;
}
