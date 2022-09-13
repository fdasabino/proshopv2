import React from "react";
import { FaUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { Navbar, Container, Offcanvas, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" className="mb-3 p-4">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            PROSHOP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">
                  <FaHome />
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart /> Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  <FaUser /> Sign in
                </Nav.Link>
                <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand`}>
                  <NavDropdown.Item as={Link} to="/">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
