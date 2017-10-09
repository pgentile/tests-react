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
  }

  setContainerElement = element => {
    this.containerElement = element;
  }

  componentDidMount() {
    reCaptchaLoadedPromise.then(captchaApi => {
      const { siteKey, theme, size, onSuccess, onExpired } = this.props;

      this.id = captchaApi.render(this.containerElement, {
        sitekey: siteKey,
        theme,
        size,
        callback: onSuccess,
        'expired-callback': onExpired,
      });
    });
  }

  render() {
    return (
      <span ref={this.setContainerElement} />
    );
  }

}

