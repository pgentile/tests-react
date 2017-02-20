import React from 'react';

import { PageComponent } from '../../page/components';
import RatingInput from './RatingInput';


export default class SamplesComponent extends React.Component {

  constructor() {
    super();

    this._onRatingChange = this._onRatingChange.bind(this);

    this.state = {
      value: 3,
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
          <p>
            <RatingInput value={this.state.value} max={5} onChange={this._onRatingChange}/>
          </p>
        </div>
      </PageComponent>
    );
  }

}

SamplesComponent.propTypes = {};
