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
  }

  loadTopic(event) {
    event.preventDefault();
    if (this.props.topic) {
      this.props.onLoadTopic(this.props.topic);
    }
  }

  changeTopic(event) {
    event.preventDefault();
    this.props.onChangeTopic(event.target.value);
  }

  componentDidMount() {
    if (this.props.topic) {
      this.props.onLoadTopic(this.props.topic);
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
                    value={this.props.topic}
                    onChange={changeTopic}/>
              </InputGroupField>
              <div className="input-group-button">
                <Button disabled={!this.props.topic}>Load topic</Button>
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
  onChangeTopic: React.PropTypes.func.isRequired,
};


export function RedditListComponent({list}) {
  const items = list.map(elem => {
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
};
