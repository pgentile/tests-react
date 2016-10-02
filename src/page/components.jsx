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
      <Error/>
      {children}
    </div>
  );
}

BasePageComponent.propTypes = {
  children: React.PropTypes.element.isRequired,
};



export function PageComponent({title, children}) {
  return (
    <Row>
      <Column>
          <h1>{title}</h1>
          {children}
      </Column>
    </Row>
  );
}

PageComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};
