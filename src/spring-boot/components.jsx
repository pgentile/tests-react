import React from 'react';
import { Row, Column, Button } from 'react-foundation';

import AboutComponentContainer from './containers/AboutComponentContainer';


import { PageComponent } from '../page/components';


export function SpringBootComponent({springBoot, onUrlChange}) {
  return (
    <PageComponent title="Spring Boot">
      <TargetAppForm baseUrl={springBoot.baseUrl} onUrlChange={onUrlChange} />
      <AboutComponentContainer/>
    </PageComponent>
  );
}

SpringBootComponent.propTypes = {
  springBoot: React.PropTypes.object,
  onUrlChange: React.PropTypes.func.isRequired,
};


class TargetAppForm extends React.Component {

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
    )
  }

}

TargetAppForm.propTypes = {
  baseUrl: React.PropTypes.string.isRequired,
  onUrlChange: React.PropTypes.func.isRequired,
};
