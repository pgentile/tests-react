import PropTypes from 'prop-types';
import React from 'react';
import { Row, Column } from 'react-foundation';

import { NavbarComponent } from '../navbar/components';
import { LoadingIndicator } from '../loadingindicator/containers';
import { Error } from '../errors/containers';
import ErrorBoundary from '../core/components/ErrorBoundary';


export function BasePageComponent({children}) {
  return (
    <div>
      <NavbarComponent/>
      <LoadingIndicator/>
      <Error/>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
}

BasePageComponent.propTypes = {
  children: PropTypes.element,
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
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
