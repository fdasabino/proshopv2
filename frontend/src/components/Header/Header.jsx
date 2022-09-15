import React from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHome,
  FaProjectDiagram,
  FaUserPlus,
  FaSignOutAlt,
  FaListUl,
} from "react-icons/fa";
import { logout } from "../../redux-store/actions/userActions";
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("You have been logged out...");
  };

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
                {userInfo ? (
                  <NavDropdown
                    title={userInfo && userInfo.name.split(" ")[0]}
                    id={`offcanvasNavbarDropdown-expand`}
                    className="text-uppercase"
                  >
                    <NavDropdown.Item as={Link} to="/login" className="text-uppercase">
                      <FaUser /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/" className="text-uppercase">
                      <FaListUl /> Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler} className="text-uppercase">
                      <FaSignOutAlt />
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown
                    title="Login"
                    id={`offcanvasNavbarDropdown-expand`}
                    className="text-uppercase"
                  >
                    <NavDropdown.Item as={Link} to="/login" className="text-uppercase">
                      <FaUser /> Sign in
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/" className="text-uppercase">
                      <FaUserPlus /> Sign up
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

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
