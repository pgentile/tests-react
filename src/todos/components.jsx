import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { Menu, MenuItem, Button, Sizes, Row, Column } from 'react-foundation';

import { InputGroup, InputGroupField } from '../core/components';


export function Todo({item, onDelete, onMarkDone}) {

  const creationDate = (
    <small>
      {' '}&mdash; créé le {item.createdAt.format('LLL')}
    </small>
  );

  let modificationDate = null;
  if (item.createdAt !== item.modifiedAt) {
    modificationDate = (
      <small>
        {' '}&mdash; modifié le {item.modifiedAt.format('LLL')}
      </small>
    );
  }

  return (
    <MenuItem className="menu-text clearfix">
      <b>{item.content}</b>
      {creationDate}
      {modificationDate}
      <span className="float-right">
        <Button onClick={() => onMarkDone(item.id)} disabled={item.done} size={Sizes.TINY}>Done</Button>
        <Button onClick={() => onDelete(item.id)} size={Sizes.TINY}>Remove</Button>
      </span>
    </MenuItem>
  );
}

Todo.propTypes = {
  item: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onMarkDone: React.PropTypes.func.isRequired,
};


export function TodoList({list, onDeleteItem, onMarkItemDone}) {

  const todos = list.map(item => {
    return <Todo
              key={item.id}
              item={item}
              onDelete={() => onDeleteItem(item.id)}
              onMarkDone={() => onMarkItemDone(item.id)} />;
  });

  if (list.size > 0) {
    return (
      <Menu isVertical>
        {todos}
      </Menu>
    );
  } else {
    return (
      <p>Aucun item à afficher</p>
    );
  }
}

TodoList.propTypes = {
  list: ImmutablePropTypes.list.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
  onMarkItemDone: React.PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  list: Immutable.List(),
};


export class AddTodoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  valueChanged(event) {
    this.setState({
      value: event.target.value,
    });
  }

  addTodo(event) {
    event.preventDefault();

    if (this.state.value) {
      this.props.onAddItem(this.state.value);
      this.setState({
        value: '',
      });
    }
  }

  render() {
    const valueChanged = this.valueChanged.bind(this);
    const addTodo = this.addTodo.bind(this);

    return (
      <form onSubmit={addTodo}>
        <Row>
          <Column>
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
                <Button disabled={!this.state.value}>Add</Button>
              </div>
            </InputGroup>
          </Column>
        </Row>
      </form>
    )
  }

}

AddTodoComponent.propTypes = {
  onAddItem: React.PropTypes.func.isRequired,
};


export function TodoVisibilityComponent({viewDone, doneTodosCount, onDoneChange}) {

  const onChange = (event) => onDoneChange(event.target.checked);

  return (
    <Row>
      <fieldset className="columns">
        <legend>Options de visibilité</legend>
        <label>
          <input type="checkbox" defaultChecked={viewDone} onChange={onChange}/>
          Afficher les tâches terminées ({doneTodosCount})
        </label>
      </fieldset>
    </Row>
  );
}

TodoVisibilityComponent.propTypes = {
  viewDone: React.PropTypes.bool.isRequired,
  doneTodosCount: React.PropTypes.number.isRequired,
  onDoneChange: React.PropTypes.func.isRequired,
};
