import React from 'react';

import { NavbarComponent } from './components';
import { LoadingIndicator } from '../loadingindicator/containers';
import { Error } from '../errors/containers';


export function PageWithNavbarComponent({children}) {
  return (
    <div>
      <NavbarComponent/>
      <LoadingIndicator/>
      <Error/>
      {children}
    </div>
  );
};
