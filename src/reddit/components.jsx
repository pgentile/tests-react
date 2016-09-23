import React from 'react';

import { Button, Row, Column } from 'react-foundation';



function InputGroup({children}) {
  return (
    <div className="input-group">
      {children}
    </div>
  )
}


function InputGroupField({children}) {
  return (
    <div className="input-group-field">
      {children}
    </div>
  )
}


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

    return (
      <form onSubmit={loadTopic}>
        <Row>
          <Column large={12}>
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
      </form>
    )
  }

}

LoadTopicComponent.propTypes = {
  topic: React.PropTypes.string.isRequired,
  onLoadTopic: React.PropTypes.func.isRequired,
};

LoadTopicComponent.defaultProps = {
  topic: '',
};


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
    const items = this.props.list.map(elem => {
      return (
        <li key={elem.id}>
          <a href={elem.url}>{elem.title}</a>
        </li>
      );
    });

    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }

}

RedditListComponent.propTypes = {
  topic: React.PropTypes.string.isRequired,
  list: React.PropTypes.array.isRequired,
  onLoadTopic: React.PropTypes.func.isRequired,
  onUnloadTopic: React.PropTypes.func.isRequired,
};
