import React from 'react';


export function Error({message, onDismiss}) {
  if (message === null) {
    return null;
  }

  return (
    <div className="alert callout">
      <h5>Une erreur s'est produite...</h5>
      <p>{message}</p>
      <button className="close-button" aria-label="Dismiss alert" type="button" onClick={onDismiss}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
