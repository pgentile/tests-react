import React from 'react';
import PropTypes from 'prop-types';
import Mark from 'mark.js';


export default class TermHighlighter extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    terms: PropTypes.string,
  }

  componentDidMount() {
    this.mark(false, this.props.terms);
  }

  componentDidUpdate() {
    this.mark(true, this.props.terms);
  }

  mark(unmark = false, terms = null) {
    this.lastMarkOp = this.lastMarkOp.then(() => {
      const markContext = new Mark(this.rootElement);
      if (unmark) {
        markContext.unmark();
      }
      if (terms) {
        markContext.mark(terms);
      }
    });
  }

  rootElement = null;

  lastMarkOp = new Promise(resolve => resolve(null));

  setRootElement = (element) => {
    this.rootElement = element;
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={this.setRootElement}>
        {children}
      </div>
    );
  }
}
