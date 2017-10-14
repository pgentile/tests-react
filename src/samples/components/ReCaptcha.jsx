import React from 'react';
import PropTypes from 'prop-types';


// Resolve a Promise when the API is loaded
// The callback is bound to the window object: onReCaptchaLoaded
const reCaptchaApiPromise = new Promise(resolve => {
  window.onReCaptchaLoadedV2 = () => {
    resolve(window.grecaptcha);
  };

  // Add the reCaptcha script
  document.addEventListener('DOMContentLoaded', () => {
    const reCaptchaScript = document.createElement('script');
    reCaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCaptchaLoadedV2';
    document.getElementsByTagName('head')[0].appendChild(reCaptchaScript);
  });
});


export default class ReCaptcha extends React.PureComponent {

  static propTypes = {
    siteKey: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onExpire: PropTypes.func,
  };

  static defaultProps = {
    theme: 'light',
    size: 'normal',
    type: 'image',
    badge: 'bottomright',
  };

  containerElement = null;
  captchaApi = null;
  token = null;
  widgetId = null;

  state = {
    loaded: false,
  };

  execute() {
    if (this.widgetId !== null) {
      this.captchaApi.execute(this.widgetId);
    }
  }

  setContainerElement = element => {
    this.containerElement = element;
  }

  cleanContainerElement() {
    const range = document.createRange();
    range.selectNodeContents(this.containerElement);
    range.deleteContents();
  }

  addRenderingElement() {
    const renderingElement = document.createElement('div');
    this.containerElement.appendChild(renderingElement);
    return renderingElement;
  }

  onSuccess = token => {
    this.token = token;
    this.props.onSuccess(token);
  }

  onExpire = () => {
    this.token = null;
    if (this.props.onExpire) {
      this.props.onExpire();
    }
  }

  componentDidMount() {
    reCaptchaApiPromise.then(captchaApi => {
      this.captchaApi = captchaApi;

      this.setState({
        loaded: true,
      });
    });
  }

  componentDidUpdate() {
    // Reset the token
    if (this.token) {
      this.onExpire();
    }

    // This is an update: remove any previous captcha
    this.cleanContainerElement();

    // Render if the library is loaded
    if (this.state.loaded) {
      const { siteKey, type, theme, size } = this.props;

      // Render the Captcha in a new element each time.
      // A new element is required each time. Otherwise, the captcha lib fails.
      const renderingElement = this.addRenderingElement();
      this.widgetId = this.captchaApi.render(renderingElement, {
        sitekey: siteKey,
        type,
        theme,
        size,
        badge: 'inline',
        callback: this.onSuccess,
        'expired-callback': this.onExpire,
      });
    }
  }

  render() {
    return (
      <div ref={this.setContainerElement} />
    );
  }

}

