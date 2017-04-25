import React from 'react';

import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from 'react-foundation';


class SampleForm extends React.Component {

  static propTypes = {
    ...formPropTypes,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <p>
          <label>
            User
            <Field name="user" component="input" type="text" autoComplete="username" />
          </label>
        </p>

        <p>
          <label>
            Password
            <Field name="password" component="input" type="password" autoComplete="new-password" />
          </label>
        </p>

        <p>
          <label>
            Name
            <Field name="name" component="input" type="text" autoComplete="name" />
          </label>
        </p>

        <p>
          <label>
            Email
            <Field name="email" component="input" type="text" autoComplete="email" />
          </label>
        </p>

        <p>
          <Button type="submit">Envoyer</Button>
        </p>

      </form>
    );
  }

}


export default reduxForm()(SampleForm);
