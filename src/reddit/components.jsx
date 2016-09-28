import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Column } from 'react-foundation';

import { InputGroup, InputGroupField } from '../core/components';


export class LoadTopicComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: props.topic,
    };
  }

  loadTopic(event) {
    event.preventDefault();
    if (this.state.topic) {
      this.props.onLoadTopic(this.state.topic);
    }
  }

  changeTopic(event) {
    event.preventDefault();
    this.setState({
      topic: event.target.value,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      console.log(`Updating load topic to ${this.props.topic}`);
      this.setState({
        topic: this.props.topic,
      });
    }
  }

  render() {
    const changeTopic = this.changeTopic.bind(this);
    const loadTopic = this.loadTopic.bind(this);

    const sampleTopics = this.props.sampleTopics.map(topic => {
      const to = '/reddit/' + topic;
      return (
        <span key={topic}>
          {' '}<Link to={to}>{topic}</Link>
        </span>
      );
    });

    return (
      <form onSubmit={loadTopic}>
        <Row>
          <Column>
            <InputGroup>
              <InputGroupField>
                <input
                    type="text"
                    className="input-group-field"
                    placeholder="Topic"
                    value={this.state.topic}
                    onChange={changeTopic}/>
              </InputGroupField>
              <div className="input-group-button">
                <Button disabled={!this.state.topic}>Load topic</Button>
              </div>
            </InputGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Try these samples : {sampleTopics}
            </p>
          </Column>
        </Row>
      </form>
    )
  }

}

LoadTopicComponent.propTypes = {
  topic: React.PropTypes.string.isRequired,
  sampleTopics: React.PropTypes.array.isRequired,
  onLoadTopic: React.PropTypes.func.isRequired,
};

LoadTopicComponent.defaultProps = {
  topic: '',
  sampleTopics: ['apple', 'google', 'redis', 'python'],
};


function RedditListItem({elem}) {
  return (
    <Row>
      <h2>
        <a href={elem.url}>{elem.title}</a>
      </h2>
      <p>{elem.selftext}</p>
    </Row>
  );
}


export class RedditListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadTopic(this.props.topic);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      console.log(`Updating list topic to ${this.props.topic}`);
      this.props.onLoadTopic(this.props.topic);
    }
  }

  componentWillUnmount() {
    this.props.onUnloadTopic();
  }

  render() {
    const items = this.props.list.map(elem => <RedditListItem key={elem.id} elem={elem}/>);

    return (
      <Column>
        {items}
      </Column>
    );
  }

}

RedditListComponent.propTypes = {
  topic: React.PropTypes.string.isRequired,
  list: React.PropTypes.array.isRequired,
  onLoadTopic: React.PropTypes.func.isRequired,
  onUnloadTopic: React.PropTypes.func.isRequired,
};
