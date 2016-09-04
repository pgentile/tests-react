import React from 'react';
import { Menu, MenuItem, Button, Sizes, Row, Column, ButtonGroup } from 'react-foundation';


function Box(props) {
  return (
    <MenuItem className="menu-text clearfix">
      <b>Current box:</b> {props.children}
      <span className="float-right">
        <Button onClick={props.onDone} disabled={props.done} size={Sizes.TINY}>Done</Button>
        <Button onClick={props.onRemove} size={Sizes.TINY}>Remove</Button>
      </span>
    </MenuItem>
  );
}

Box.propTypes = {
  onRemove: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
  done: React.PropTypes.bool.isRequired,
  children: React.PropTypes.string.isRequired,
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


export function BoxList(props) {

  let boxeNodes = props.list.map((item, index) => {
    const removeBox = () => props.onRemoveBox(item.id);
    const markDone = () => props.onDone(item.id);
    return <Box key={item.id} onRemove={removeBox} onDone={markDone} done={item.done}>{item.content}</Box>;
  });

  const addBox = value => props.onAddBox(value);

  return (
    <div>
      <AddBoxComponent onAddBox={addBox}/>
      <Menu isVertical>
        {boxeNodes}
      </Menu>
    </div>
  );

};

BoxList.propTypes = {
  list: React.PropTypes.array.isRequired,
  onAddBox: React.PropTypes.func.isRequired,
  onRemoveBox: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
};

BoxList.defaultProps = {
  list: [],
};
