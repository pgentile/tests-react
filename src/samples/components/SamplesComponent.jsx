import React from 'react';

import { PageComponent } from '../../page/components';
import RatingInput from './RatingInput';
import FlexibleTextarea from './FlexibleTextarea';
import ReCaptcha from './ReCaptcha';
import DebouncedTextInput from './DebouncedTextInput';


export default class SamplesComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      value: null,
      debouncedValue: '',
      textareaValue: '',
    };
  }

  _onRatingChange = (value) => {
    this.setState({
      value,
    });
  }

  _onTextareaChange = (event) => {
    this.setState({
      textareaValue: event.target.value,
    });
  }

  _onReCaptchaSuccess = token => {
    console.log('Got captcha token', token);
  }

  _onReCaptchaExpire = () => {
    console.log('Captcha token expired');
  }

  _onDebouncedValueChange = event => {
    console.log('Debounced event:', event);
    console.log('Debounced value:', event.target.value);

    this.setState({
      debouncedValue: event.target.value,
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
            <FlexibleTextarea value={this.state.textareaValue} onChange={this._onTextareaChange} />
          </p>
        </div>
        <div>
          <h2>Google ReCaptcha</h2>
          <ReCaptcha
            siteKey="6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt"
            onSuccess={this._onReCaptchaSuccess}
            onExpire={this._onReCaptchaExpire} />
        </div>
        <div>
          <h2>Debounced text input</h2>
          <DebouncedTextInput debounceTimeout={1000} value={this.state.debouncedValue} onChange={this._onDebouncedValueChange} />
        </div>
      </PageComponent>
    );
  }

}
