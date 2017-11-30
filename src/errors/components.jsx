import PropTypes from 'prop-types';
import React from 'react';


export class Error extends React.Component {

  static propTypes = {
    lastMessage: PropTypes.string,
    errorCount: PropTypes.number.isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

  onDismissClick = () => {
    const { onDismiss } = this.props;
    onDismiss();
  };


  render() {
    const { lastMessage, errorCount } = this.props;

    if (errorCount === 0) {
      return null;
    }

    let moreErrors = null;
    if (errorCount > 1) {
      moreErrors = (
        <p>{errorCount - 1} autres erreurs se sont également produites avant.</p>
      );
    }

    return (
      <div className="alert callout">
        <h5>Une erreur s&apos;est produite...</h5>
        <p>{lastMessage ? lastMessage : 'Raison inconnue'}</p>
        {moreErrors}

        <button className="close-button" aria-label="Dismiss alert" type="button" onClick={this.onDismissClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

}
