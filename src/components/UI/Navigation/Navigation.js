import React from "react";
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand component={RouterNavLink} to="/">Quotes Central</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/quotes">Quotes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/add-quote">Submit new quote</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;