import React, { PropTypes } from 'react'

import _ from 'lodash';

import css from './RatingInput.css';


export default function RatingInput({max, value, onChange}) {
  const stars = _.range(max).map(index => {
    const className = index < value ? css['rating-input-selected'] : css['rating-input'];

    const onClick = newValue => {
      if (onChange) {
        return () => {
          onChange(newValue);
        };
      } else {
        return () => {};
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

RatingInput.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
