import React from 'react';
import { Menu, MenuItem } from 'react-foundation';
import { Link } from 'react-router';


export function NavbarComponent() {
  return (
    <Menu>
      <MenuItem>
        <Link to="/">TODOs</Link>
      </MenuItem>
    </Menu>
  );
};


export function PageWithNavbarComponent({children}) {
  return (
    <div>
      <NavbarComponent/>
      {children}
    </div>
  );
};
