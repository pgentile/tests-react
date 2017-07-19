import PropTypes from 'prop-types';
import React from 'react';
import { Row, Column, Button } from 'react-foundation';


export default class TargetAppForm extends React.Component {

  constructor(props) {
    super(props);

    this.onUrlChange = this.onUrlChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      baseUrl: props.baseUrl,
    };
  }

  onUrlChange(event) {
    event.preventDefault();
    this.setState({
      baseUrl: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onUrlChange(this.state.baseUrl);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Row>
          <Column>
            <div className="input-group">
              <input
                type="url"
                className="input-group-field"
                placeholder="Spring Boot application URL"
                value={this.state.baseUrl}
                onChange={this.onUrlChange} />
              <div className="input-group-button">
                <Button type="submit">Load</Button>
              </div>
            </div>
          </Column>
        </Row>
      </form>
    );
  }

}

TargetAppForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired,
};
