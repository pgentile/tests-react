import PropTypes from 'prop-types';
import React from 'react';

import { range } from 'lodash-es';

import css from './RatingInput.css';


export default class RatingInput extends React.PureComponent {

  static propTypes = {
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  render() {
    const { max, value, onChange } = this.props;

    const stars = range(max).map(index => {
      const className = value !== null && index < value ? css['rating-input-selected'] : css['rating-input'];

      const onClick = newValue => {
        if (onChange) {
          return () => {
            onChange(newValue);
          };
        } else {
          return () => { };
        }
      };

      return (
        <span key={index} className={className} onClick={onClick(index + 1)}>&#9733;</span>
      );
    });

    return (
      <span className={css.rating}>{stars}</span>
    );
  }

}
