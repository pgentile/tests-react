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
      <h5>Une erreur s'est produite...</h5>
      <p>{lastMessage ? lastMessage : 'Raison inconnue'}</p>
      {moreErrors}

      <button className="close-button" aria-label="Dismiss alert" type="button" onClick={onDismissClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Error.propTypes = {
  lastMessage: React.PropTypes.string,
  errorCount: React.PropTypes.number.isRequired,
  onDismiss: React.PropTypes.func.isRequired,
};
