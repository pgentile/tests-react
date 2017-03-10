import React from 'react';

import { PageComponent } from '../../page/components';
import RatingInput from './RatingInput';
import FlexibleTextarea from './FlexibleTextarea';


export default class SamplesComponent extends React.Component {

  constructor() {
    super();

    this._onRatingChange = this._onRatingChange.bind(this);
    this._onTextareaChange = this._onTextareaChange.bind(this);

    this.state = {
      value: null,
      textareaValue: '',
    };
  }

  _onRatingChange(value) {
    this.setState({
      value,
    });
  }

  _onTextareaChange(event) {
    this.setState({
      textareaValue: event.target.value,
    });
  }

  render() {
    return (
      <PageComponent title="Exemples">
        <div>
          <h2>Rating</h2>
          <p><RatingInput value={this.state.value} max={5} onChange={this._onRatingChange} /></p>
          <p>Current value is : {this.state.value}</p>
        </div>
        <div>
          <h2>Flexible textarea</h2>
          <p>
            <FlexibleTextarea value={this.state.textareaValue} onChange={this._onTextareaChange}/>
          </p>
        </div>
      </PageComponent>
    );
  }

}

SamplesComponent.propTypes = {};
