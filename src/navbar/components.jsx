import React from 'react';
import { Menu, MenuItem } from 'react-foundation';
import { Link } from 'react-router';


function NavbarLink({to, children}) {
  return (
    <MenuItem>
      <Link to={to}>{children}</Link>
    </MenuItem>
  );
}


const Navbar = Menu;


export function NavbarComponent() {
  return (
    <Navbar>
      <NavbarLink to="/">TODOs</NavbarLink>
      <NavbarLink to="/reddit">Reddit</NavbarLink>
    </Navbar>
  );
};
