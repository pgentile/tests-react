import React from 'react';

class Box extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(`Component ${this} mounted`);
  }

  componentWillUnmount() {
    console.log(`Component ${this} unmounted`);
  }

  onRemoveBox() {
    this.props.onRemoveBox();
  }

  render() {
    let onRemoveBox = () => this.onRemoveBox();
    return (
      <p className="box">
        <b>Current box:</b> {this.props.children.toString() }
        <button onClick={onRemoveBox}>Remove</button>
      </p>
    );
  }

}

Box.propTypes = {
  onRemoveBox: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired
};


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
    if (this.state.value) {
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

AddBoxComponent.propTypes = {
  onAddBox: React.PropTypes.func.isRequired
};


class BoxList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: props.list.slice()
    };
  }

  addBox(value) {
    this.setState({
      list: this.state.list.concat([value])
    });
  }

  removeBox(removeIndex) {
    this.state.list.splice(removeIndex, 1);
    this.forceUpdate();
  }

  render() {
    let boxeNodes = this.state.list.map((item, index) => {
      let removeBox = () => this.removeBox(index);
      return <Box key={index} onRemoveBox={removeBox}>{item}</Box>;
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

BoxList.propTypes = {
  list: React.PropTypes.array.isRequired
};

BoxList.defaultProps = {
  list: ['A', 'B', 'C']
};


export default BoxList;
