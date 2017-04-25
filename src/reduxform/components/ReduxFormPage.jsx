import React from 'react';

import { PageComponent } from '../../page/components';
import SampleForm from './SampleForm';
import QueryParamsForm from './QueryParamsForm';


export default class ReduxFormPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        user: 'toto',
        password: 'password',
        name: 'Toto',
        email: 'toto@example.com',
      },
    };
  }

  render() {
    const queryModel = [
      {
        name: 'email',
        label: 'Email',
        type: 'array',
      },
      {
        name: 'provider',
        label: 'Fournisseur',
        type: 'enum',
        enumValues: ['Google', 'Facebook'],
      },
      {
        name: 'name',
        label: 'Nom',
      },
    ];

    const query = {
      provider: 'Google',
      email: [
        '',
      ],
    };

    return (
      <PageComponent title="Redux Form">
        <QueryParamsForm model={queryModel} initialValues={query} />
        <hr />
        <SampleForm form="toto" initialValues={this.state.initialValues} onSubmit={this.onSampleFormSubmit} />
      </PageComponent>
    );
  }

  onSampleFormSubmit = values => {
    window.alert(`Form values: ${JSON.stringify(values)}`);
  };

}
