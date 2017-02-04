import React from 'react';


export default function PrettyValue({value}) {
  return (
    <pre>{JSON.stringify(value, undefined, 2)}</pre>
  );
}

PrettyValue.propTypes = {
  value: React.PropTypes.any,
};

/*
// USE PRISM

import Prism from 'prismjs';
import 'prismjs/components/prism-json.js';

class PrettyValue extends React.Component {

  constructor(props) {
    super(props);

    this.setElement = this.setElement.bind(this);

    this.element = null;
  }

  componentDidMount() {
    if (this.element) {
      Prism.highlightElement(this.element);
    }
  }

  componentDidUpdate() {
    if (this.element) {
      Prism.highlightElement(this.element, true);
    }
  }

  setElement(element) {
    this.element = element;
  }

  render() {
    if (this.props.value === null) {
      return null;
    }

    return (
      <pre>
        <code ref={this.setElement} className="language-json">
          {JSON.stringify(this.props.value, undefined, 2)}
        </code>
      </pre>
    );
  }

}

*/
