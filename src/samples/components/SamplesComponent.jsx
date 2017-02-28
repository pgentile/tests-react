import React from 'react';

import { PageComponent } from '../../page/components';
import RatingInput from './RatingInput';


export default class SamplesComponent extends React.Component {

  constructor() {
    super();

    this._onRatingChange = this._onRatingChange.bind(this);

    this.state = {
      value: null,
    };
  }

  _onRatingChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <PageComponent title="Exemples">
        <div>
          <p><RatingInput value={this.state.value} max={5} onChange={this._onRatingChange} /></p>
          <p>Current value is : {this.state.value}</p>
        </div>
      </PageComponent>
    );
  }

}

SamplesComponent.propTypes = {};
