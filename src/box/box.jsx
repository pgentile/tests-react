import React from 'react';
import { Form, FormGroup, FormControl, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';


class Box extends React.Component {

  constructor(props) {
    super(props);
    this.onRemoveBox = this.onRemoveBox.bind(this);
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
    return (
      <ListGroupItem>
        <b>Current box:</b> {this.props.children }
        {' '}
        <Button
            onClick={this.onRemoveBox}
            bsSize="xsmall"
            className="pull-right">
          <Glyphicon glyph="remove" />
          {' '}
          Remove
        </Button>
      </ListGroupItem>
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
    this.changeNewBoxValue = this.changeNewBoxValue.bind(this);
    this.addBox = this.addBox.bind(this);
  }

  changeNewBoxValue(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
  }

  addBox(event) {
    event.preventDefault();
    if (this.state.value) {
      this.props.onAddBox(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    return (
      <Form inline style={{marginBottom: '10px'}} onSubmit={this.addBox}>
        <FormGroup>
          <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter your text here"
              onChange={this.changeNewBoxValue}
            />
          {' '}
          <Button
              type="submit"
              bsStyle="primary"
              disabled={!this.state.value}>
            Add new box
          </Button>
        </FormGroup>
      </Form>
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
    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
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
      let removeBoxByIndex = () => this.removeBox(index);
      return (
        <Box key={index} onRemoveBox={removeBoxByIndex}>
          {item}
        </Box>
      );
    });

    return (
      <div>
        <AddBoxComponent onAddBox={this.addBox}/>
        <ListGroup>
          {boxeNodes}
        </ListGroup>
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
