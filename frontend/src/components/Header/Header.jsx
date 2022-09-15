import React from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHome,
  FaHouseUser,
  FaProjectDiagram,
  FaUserPlus,
  FaSignOutAlt,
  FaSignInAlt,
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
              <Nav className="align-items-start justify-content-end  flex-grow-1">
                <Nav.Link as={Link} to="/" className="text-uppercase gap-1">
                  <FaHome />
                  Home
                </Nav.Link>

                {userInfo ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <FaHouseUser color="black" />
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
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-1">
                    <FaSignInAlt color="black" />
                    <NavDropdown
                      className="text-black"
                      title="Login"
                      id={`offcanvasNavbarDropdown-expand`}
                    >
                      <NavDropdown.Item as={Link} to="/login" className="text-uppercase">
                        <FaUser /> Sign in
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/register" className="text-uppercase">
                        <FaUserPlus /> Sign up
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}

                <Nav.Link as={Link} to="/cart" className="text-uppercase gap-1">
                  <FaShoppingCart /> Cart
                  <Badge bg="warning" className="p-2 rounded-circle">
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
