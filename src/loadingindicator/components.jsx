import React from 'react';


export function LoadingIndicator({ active }) {
  if (active) {
    return (
      <p><b>Loading...</b></p>
    )
  }

  return null;
}

LoadingIndicator.propTypes = {
  active: React.PropTypes.bool.isRequired,
};
