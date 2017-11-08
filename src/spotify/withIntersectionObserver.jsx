import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


export const intersectionObserverPropTypes = {
  intersectionRatio: PropTypes.number,
  unregisterFromIntersectionObserver: PropTypes.func.isRequired,
};


export class IntersectionObserverAdapter {

  registry = new Map();

  constructor(options = {}) {
    this.observer = new IntersectionObserver(this._onThreshold, options);
  }

  register(domElement, reactElement) {
    this.registry.set(domElement, reactElement);
    this.observer.observe(domElement);
  }

  unregister(domElement) {
    this.registry.delete(domElement);
    this.observer.unobserve(domElement);
  }

  _onThreshold = entries => {
    entries.forEach(entry => {
      const reactElement = this.registry.get(entry.target);
      if (reactElement) {
        reactElement.onThreshold({
          intersectionRatio: entry.intersectionRatio,
        });
      }
    });
  };

}


export default function withIntersectionObserver(adapter, wrapperElement = 'div') {
  // Uppercase renaming because of React element creation
  const WrapperElement = wrapperElement;

  return Component => {
    return class extends React.Component {

      static displayName = `withIntersectionObserver(${getDisplayName(Component)})`;

      wrapperInstance = null;

      state = {
        intersectionRatio: null,
      };

      onThreshold({ intersectionRatio }) {
        this.setState({
          intersectionRatio,
        });
      }

      unregisterFromIntersectionObserver = () => {
        adapter.unregister(this.wrapperInstance);

        // Not observed ? Use a ratio of 1
        this.setState({
          intersectionRatio: 1,
        });

        // Remove the unregister function: it should not update the child element
        this.unregisterFromIntersectionObserver = noop;
      }

      componentDidMount() {
        adapter.register(this.wrapperInstance, this);
      }

      componentWillUnmount() {
        adapter.unregister(this.wrapperInstance);
      }

      render() {
        const { intersectionRatio } = this.state;
        return (
          <WrapperElement ref={this._setWrapperInstance}>
            <Component
              {...this.props}
              intersectionRatio={intersectionRatio}
              unregisterFromIntersectionObserver={this.unregisterFromIntersectionObserver} />
          </WrapperElement>
        );
      }

      _setWrapperInstance = wrapperInstance => {
        this.wrapperInstance = wrapperInstance;
      };

    };
  };
}


const noop = () => {};
