import React from 'react';

class Box extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className="box">
        <b>Current box:</b> {this.props.content || 'No content'}
      </p>
    );
  }

}


class AddBoxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  valueChanged(event) {
    this.setState({
      value: event.target.value
    });
  }

  addBox() {
    if (this.props.onAddBox && this.state.value) {
      this.props.onAddBox(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    let valueChanged = event => this.valueChanged(event);
    let addBox = event => this.addBox();

    return (
      <span>
        <input placeholder="Entrez votre texte ici"
                value={this.state.value}
                onChange={valueChanged}/>
        <button onClick={addBox} disabled={!this.state.value}>
          Add new box
        </button>
      </span>
    )
  }

}


class BoxList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: props.list
    };
  }

  addBox(value) {
    this.setState({
      list: this.state.list.concat([value])
    });
  }

  render() {
    let key = 0;
    let boxeNodes = this.state.list.map(item => {
      key++;
      return <Box key={key} content={item}/>;
    });

    let addBox = value => this.addBox(value);

    return (
      <div>
        <p>
          <AddBoxComponent onAddBox={addBox}/>
        </p>
        <div className="box-list">
          {boxeNodes}
        </div>
      </div>
    );
  }

}

BoxList.defaultProps = {
  list: ['A', 'B', 'C']
};

export default BoxList;
