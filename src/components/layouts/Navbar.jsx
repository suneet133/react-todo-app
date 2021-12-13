import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink
            className={navData =>
              navData.isActive
                ? 'navbar-item is-active has-text-info has-text-weight-bold'
                : 'navbar-item'
            }
            exact
            to="/"
          >
            Todo App
          </NavLink>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              to="/"
              className={navData =>
                navData.isActive
                  ? 'navbar-item is-active has-text-info'
                  : 'navbar-item'
              }
              exact
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={navData =>
                navData.isActive
                  ? 'navbar-item is-active has-text-info'
                  : 'navbar-item'
              }
              exact
            >
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
