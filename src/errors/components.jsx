import PropTypes from 'prop-types';
import React from 'react';


export function Error({lastMessage, errorCount, onDismiss}) {
  if (errorCount === 0) {
    return null;
  }

  let moreErrors = null;
  if (errorCount > 1) {
    moreErrors = (
      <p>{errorCount - 1} autres erreurs se sont également produites avant.</p>
    );
  }

  const onDismissClick = () => onDismiss();

  return (
    <div className="alert callout">
      <h5>Une erreur s&apos;est produite...</h5>
      <p>{lastMessage ? lastMessage : 'Raison inconnue'}</p>
      {moreErrors}

      <button className="close-button" aria-label="Dismiss alert" type="button" onClick={onDismissClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Error.propTypes = {
  lastMessage: PropTypes.string,
  errorCount: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
