import React from 'react';
import { Row, Column } from 'react-foundation';

import { NavbarComponent } from '../navbar/components';
import { LoadingIndicator } from '../loadingindicator/containers';
import { Error } from '../errors/containers';


export function BasePageComponent({children}) {
  return (
    <div>
      <NavbarComponent/>
      <LoadingIndicator/>
      <div>
        <Error/>
        {children}
      </div>
    </div>
  );
};


export function PageComponent({title, children}) {
  return (
    <Column>
      <Row>
        <h1>{title}</h1>
        {children}
      </Row>
    </Column>
  );
};
