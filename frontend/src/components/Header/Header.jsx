import React, { useState } from "react";
import { FaProjectDiagram, FaShoppingCart } from "react-icons/fa";
import { logout } from "../../redux-store/actions/userActions";

import SearchBox from "../SearchBox/SearchBox";
import { Twirl as Hamburger } from "hamburger-react";
import { Navbar, Offcanvas, Nav, NavDropdown, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Header.css";

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
      <Navbar expand="lg" className="d-flex justify-content-center p-2 bg-light fixed-top">
        <div className="left">
          <Navbar.Brand as={Link} to="/">
            <FaProjectDiagram color="teal" /> PROSHOP
          </Navbar.Brand>
        </div>

        <div className="right">
          <Button variant="light" onClick={handleShow}>
            <Hamburger toggled={show} toggle={handleShow} color="teal" />
          </Button>
        </div>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Nav.Link as={Link} to="/cart" onClick={handleClose}>
              <FaShoppingCart className="mx-1" />
              <Badge bg="warning" className="p-2 rounded-circle">
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
              </Badge>
            </Nav.Link>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>

              {userInfo ? (
                <div>
                  <NavDropdown
                    title={userInfo && userInfo.name.split(" ")[0]}
                    id={`offcanvasNavbarDropdown-expand`}
                  >
                    <NavDropdown.Item as={Link} to="/profile" onClick={handleClose}>
                      Profile
                    </NavDropdown.Item>

                    {userInfo.isAdmin && (
                      <>
                        <NavDropdown.Item onClick={handleClose} as={Link} to="/admin/orderlist">
                          Manage Orders
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={handleClose} as={Link} to="/admin/userlist">
                          Manage users
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={handleClose} as={Link} to="/admin/productlist">
                          Manage Products
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
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-1">
                  <NavDropdown title="Login" id={`offcanvasNavbarDropdown-expand`}>
                    <NavDropdown.Item as={Link} to="/login" onClick={handleClose}>
                      Sign in
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register" onClick={handleClose}>
                      Sign up
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
          </Offcanvas.Body>
          <SearchBox handleClose={handleClose} />
        </Offcanvas>
      </Navbar>
    </header>
  );
};

export default Header;
