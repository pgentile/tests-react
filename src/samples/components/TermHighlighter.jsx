import React from 'react';
import PropTypes from 'prop-types';
import Mark from 'mark.js';


export default class TermHighlighter extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    terms: PropTypes.string,
  }

  markContext = null;

  lastMarkOp = new Promise(resolve => resolve(null));

  componentDidMount() {
    const { terms } = this.props;
    this.lastMarkOp = this.lastMarkOp.then(() => {
      this.markContext.mark(terms);
    });
  }

  componentWillUpdate() {
    this.scheduleMarkOp(() => {
      this.markContext.unmark();
    });
  }

  componentDidUpdate() {
    const { terms } = this.props;
    this.scheduleMarkOp(() => {
      this.markContext.mark(terms);
    });
  }

  setRootElement = (element) => {
    this.markContext = new Mark(element);
  }

  scheduleMarkOp(f) {
    this.lastMarkOp = this.lastMarkOp.then(() => f());
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
