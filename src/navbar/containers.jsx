import React from 'react';

import { NavbarComponent } from './components';
import { LoadingIndicator } from '../loadingindicator/containers';


export function PageWithNavbarComponent({children}) {
  return (
    <div>
      <NavbarComponent/>
      <LoadingIndicator/>
      {children}
    </div>
  );
};
