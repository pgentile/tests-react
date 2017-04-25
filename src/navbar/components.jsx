import React from 'react';
import { Link } from 'react-router';


function NavbarLink({to, children}) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

NavbarLink.propTypes = {
  to: Link.propTypes.to,
  children: React.PropTypes.string.isRequired,
};


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

Navbar.propTypes = {
  children: React.PropTypes.array.isRequired,
};


export function NavbarComponent() {
  return (
    <Navbar>
      <NavbarLink to="/">TODOs</NavbarLink>
      <NavbarLink to="/reddit">Reddit</NavbarLink>
      <NavbarLink to="/charts">Charts</NavbarLink>
      <NavbarLink to="/spotify">Spotify</NavbarLink>
      <NavbarLink to="/pagination">Pagination</NavbarLink>
      <NavbarLink to="/spring-boot">Spring Boot</NavbarLink>
      <NavbarLink to="/samples">Exemples</NavbarLink>
      <NavbarLink to="/reduxform">Redux form</NavbarLink>
    </Navbar>
  );
}
