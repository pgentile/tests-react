import React from 'react';
import { Menu, MenuItem, Button, Sizes, Row, Column, ButtonGroup } from 'react-foundation';
import './box.flux.js';

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
      <MenuItem className="menu-text clearfix">
        <b>Current box:</b> {this.props.children}
        <Button onClick={onRemoveBox} className="float-right" size={Sizes.TINY}>Remove</Button>
      </MenuItem>
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

  addBox(e) {
    e.preventDefault();

    if (this.state.value) {
      this.props.onAddBox(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    let valueChanged = event => this.valueChanged(event);
    let addBox = e => this.addBox(e);

    return (
      <form onSubmit={addBox}>
        <Row>
          <Column large={12}>
            <InputGroup>
              <InputGroupField>
                <input
                        type="text"
                        className="input-group-field"
                        placeholder="Entrez votre texte ici"
                        value={this.state.value}
                        onChange={valueChanged}/>
                </InputGroupField>
                <div className="input-group-button">
                  <Button disabled={!this.state.value}>Add new box</Button>
                </div>
              </InputGroup>
          </Column>
        </Row>
      </form>
    )
  }

}

AddBoxComponent.propTypes = {
  onAddBox: React.PropTypes.func.isRequired
};


function InputGroup(props) {
  return (
    <div className="input-group">
      {props.children}
    </div>
  )
}


function InputGroupField(props) {
  return (
    <div className="input-group-field">
      {props.children}
    </div>
  )
}


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
        <AddBoxComponent onAddBox={addBox}/>
        <Menu isVertical>
          {boxeNodes}
        </Menu>
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
