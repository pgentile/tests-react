import React from 'react';


export class LoadingIndicator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.timer = null;
  }

  componentDidMount() {
    this.syncShowState();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.active !== nextProps.active || this.state.show !== nextState.show;
  }

  componentDidUpdate() {
    this.syncShowState();
  }

  syncShowState() {
    if (this.props.active) {
      if (this.timer === null) {
        this.timer = setTimeout(() => {
          this.setState({
            show: true,
          });
        }, 250);
      }
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.setState({
        show: false,
      });
    }
  }

  render() {
    if (this.state.show) {
      return (
        <p><b>Loading&hellip;</b></p>
      )
    }

    return null;
  }

}

LoadingIndicator.propTypes = {
  active: React.PropTypes.bool.isRequired,
};

LoadingIndicator.defaultProps = {
  active: false,
};
