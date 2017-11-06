import React from 'react';
import { getDisplayName } from 'recompose';


export class IntersectionObserverAdapter {

  registry = new Map();

  constructor(options = {}) {
    this.observer = new IntersectionObserver(this._onThreshold, options)
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
        reactElement._onThreshold({
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
            <Component {...this.props} intersectionRatio={intersectionRatio} />
          </WrapperElement>
        );
      }

      _setWrapperInstance = wrapperInstance => {
        this.wrapperInstance = wrapperInstance;
      }

      _onThreshold({ intersectionRatio }) {
        this.setState({
          intersectionRatio,
        });
      }

    };
  };
}
