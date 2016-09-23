import React from 'react';
import { Link } from 'react-router';


function NavbarLink({to, children}) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}


function Navbar({children}) {
  return (
    <div className="top-bar">
      <div className="top-bar-title">
        <strong>Tests React</strong>
      </div>
      <div className="top-bar-left">
        <ul className="menu">
          {children}
        </ul>
      </div>
    </div>
  );
}


export function NavbarComponent() {
  return (
    <Navbar>
      <NavbarLink to="/">TODOs</NavbarLink>
      <NavbarLink to="/reddit">Reddit</NavbarLink>
    </Navbar>
  );
};
