import React from 'react';
import PropTypes from 'prop-types';

// Don't forget to include the script at the end of the page!
// <script src="https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCaptchaLoadedV2"></script>

// Resolve a Promise when the API is loaded
// The callback is bound to the window object: onReCaptchaLoaded
const reCaptchaLoadedPromise = new Promise(resolve => {
  window.onReCaptchaLoadedV2 = () => {
    resolve(window.grecaptcha);
  };
});


export default class ReCaptcha extends React.PureComponent {

  static propTypes = {
    siteKey: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onExpired: PropTypes.func,
  };

  static defaultProps = {
    theme: 'light',
    size: 'normal',
  };

  constructor(props) {
    super(props);

    this.containerElement = null;
    this.id = null;
    this.captchaApi = null;

    this.state = {
      loaded: false,
    };
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

  componentDidMount() {
    reCaptchaLoadedPromise.then(captchaApi => {
      this.captchaApi = captchaApi;

      this.setState({
        loaded: true,
      });
    });
  }

  componentDidUpdate() {
    // This is an update: remove any previous captcha
    this.cleanContainerElement();

    // Render if the library is loaded
    if (this.state.loaded) {
      const { siteKey, theme, size, onSuccess, onExpired } = this.props;

      // Render the Captcha in a new element each time.
      // A new element is required each time. Otherwise, the captcha lib fails.
      const renderingElement = this.addRenderingElement();
      this.id = this.captchaApi.render(renderingElement, {
        sitekey: siteKey,
        theme,
        size,
        callback: onSuccess,
        'expired-callback': onExpired,
      });
    }
  }

  render() {
    return (
      <div ref={this.setContainerElement} />
    );
  }

}

