import React from "react";
import { FaUser, FaShoppingCart, FaHome, FaProjectDiagram } from "react-icons/fa";
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <header>
      <Navbar expand="lg" className="mb-3 p-4">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <FaProjectDiagram /> PROSHOP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" className="text-uppercase">
                  <FaHome />
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="text-uppercase">
                  <FaUser /> Sign in
                </Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand`}
                  className="text-uppercase"
                >
                  <NavDropdown.Item as={Link} to="/" className="text-uppercase">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/" className="text-uppercase">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/" className="text-uppercase">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/cart" className="text-uppercase">
                  <FaShoppingCart />{" "}
                  <Badge bg="info" className="p-2 rounded-circle">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
