import PropTypes from 'prop-types';
import React from 'react';
import { Menu, MenuItem, Button, Sizes, Row, Column } from 'react-foundation';

import { InputGroup, InputGroupField } from '../core/components';


class ChangeTodoStateButton extends React.Component {

  static propTypes = {
    done: PropTypes.bool.isRequired,
    onMarkDone: PropTypes.func.isRequired,
    onMarkTodo: PropTypes.func.isRequired,
  };

  changeState = () => {
    const { done, onMarkDone, onMarkTodo } = this.props;
    return done ? onMarkTodo() : onMarkDone();
  };

  render() {
    const { done } = this.props;
    const actionText = done ? 'Todo' : 'Done';
    return (
      <Button onClick={this.changeState} size={Sizes.TINY}>{actionText}</Button>
    );
  }

}

export class Todo extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onMarkDone = this.onMarkDone.bind(this);
    this.onMarkTodo = this.onMarkTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onMarkDone() {
    this.props.onMarkDone(this.props.item.id);
  }

  onMarkTodo() {
    this.props.onMarkTodo(this.props.item.id);
  }

  onDelete() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const { item } = this.props;

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
          <ChangeTodoStateButton done={item.done} onMarkDone={this.onMarkDone} onMarkTodo={this.onMarkTodo} />
          <Button onClick={this.onDelete} size={Sizes.TINY}>Remove</Button>
        </span>
      </MenuItem>
    );
  }

}

Todo.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkDone: PropTypes.func.isRequired,
  onMarkTodo: PropTypes.func.isRequired,
};


export class TodoList extends React.Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onMarkItemDone: PropTypes.func.isRequired,
    onMarkItemTodo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: [],
  };

  render() {
    const { list, onDeleteItem, onMarkItemDone, onMarkItemTodo } = this.props;

    const todos = list.map(item => {
      return <Todo
        key={item.id}
        item={item}
        onDelete={onDeleteItem}
        onMarkDone={onMarkItemDone}
        onMarkTodo={onMarkItemTodo} />;
    });

    if (list.length > 0) {
      return (
        <Column>
          <Menu isVertical>
            {todos}
          </Menu>
        </Column>
      );
    } else {
      return (
        <Column>
          <p>Aucun item à afficher</p>
        </Column>
      );
    }
  }

}


export class AddTodoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.valueChanged = this.valueChanged.bind(this);
    this.addTodo = this.addTodo.bind(this);
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
    return (
      <form onSubmit={this.addTodo}>
        <Row>
          <Column>
            <InputGroup>
              <InputGroupField>
                <input
                  type="text"
                  className="input-group-field"
                  placeholder="Entrez votre texte ici"
                  value={this.state.value}
                  onChange={this.valueChanged} />
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
  onAddItem: PropTypes.func.isRequired,
};


export class TodoVisibilityComponent extends React.Component {

  static propTypes = {
    viewDone: PropTypes.bool.isRequired,
    doneTodosCount: PropTypes.number.isRequired,
    onDoneChange: PropTypes.func.isRequired,
  };

  onChange = (event) => {
    const { onDoneChange } = this.props;
    onDoneChange(event.target.checked);
  };

  render() {
    const { viewDone, doneTodosCount } = this.props;

    return (
      <Row>
        <Column>
          <fieldset className="columns">
            <legend>Options de visibilité</legend>
            <label>
              <input type="checkbox" defaultChecked={viewDone} disabled={doneTodosCount === 0} onChange={this.onChange} />
              Afficher les tâches terminées ({doneTodosCount})
            </label>
          </fieldset>
        </Column>
      </Row>
    );
  }

}
