import React from 'react';
import { Button } from 'react-foundation';


export default class FailingComponent extends React.PureComponent {

  state = {
    failed: false,
  }

  triggerFailure = () => {
    this.setState({
      failed: true,
    });
  }

  render() {
    if (this.state.failed) {
      throw new Error('A component threw a exception');
    }

    return (
      <Button onClick={this.triggerFailure}>Trigger Failure</Button>
    );
  }

}
