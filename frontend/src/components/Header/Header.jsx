import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHome,
  FaProjectDiagram,
  FaUserPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaUsersCog,
  FaDatabase,
  FaListUl,
} from "react-icons/fa";
import { logout } from "../../redux-store/actions/userActions";
import SearchBox from "../SearchBox/SearchBox";
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("You have been logged out...");
  };

  return (
    <header>
      <Navbar expand="lg" bg="light" className="mb-3 p-4 fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <FaProjectDiagram /> PROSHOP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} onMouseEnter={handleShow} />
          <Navbar.Offcanvas
            show={show}
            onHide={handleClose}
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="align-items-start justify-content-center">
              <Nav className="align-items-start">
                <Nav.Link as={Link} to="/" className="text-uppercase gap-1" onClick={handleClose}>
                  <FaHome />
                  Home
                </Nav.Link>

                {userInfo ? (
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <FaUser />
                    <NavDropdown
                      title={userInfo && userInfo.name.split(" ")[0]}
                      id={`offcanvasNavbarDropdown-expand`}
                      className="text-uppercase"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/profile"
                        className="text-uppercase"
                        onClick={handleClose}
                      >
                        <FaUser /> Profile
                      </NavDropdown.Item>

                      {userInfo.isAdmin && (
                        <>
                          <NavDropdown.Item
                            onClick={handleClose}
                            as={Link}
                            to="/admin/orderlist"
                            className="text-uppercase"
                          >
                            <FaListUl /> Manage Orders
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            onClick={handleClose}
                            as={Link}
                            to="/admin/userlist"
                            className="text-uppercase"
                          >
                            <FaUsersCog /> Manage users
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            onClick={handleClose}
                            as={Link}
                            to="/admin/productlist"
                            className="text-uppercase"
                          >
                            <FaDatabase /> Manage Products
                          </NavDropdown.Item>
                        </>
                      )}

                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          logoutHandler();
                          handleClose();
                        }}
                        className="text-uppercase"
                      >
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
                      <NavDropdown.Item
                        as={Link}
                        to="/login"
                        className="text-uppercase"
                        onClick={handleClose}
                      >
                        <FaUser /> Sign in
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/register"
                        className="text-uppercase"
                        onClick={handleClose}
                      >
                        <FaUserPlus /> Sign up
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}

                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="text-uppercase gap-1"
                  onClick={handleClose}
                >
                  <FaShoppingCart /> Cart
                  <Badge bg="warning" className="p-2 rounded-circle">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                </Nav.Link>
              </Nav>
              <SearchBox handleClose={handleClose} />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
