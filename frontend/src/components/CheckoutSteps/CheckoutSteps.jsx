import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="d-flex justify-content-center my-4">
      <Nav.Item>
        {step1 ? (
          <Link className="text-lowercase small text-decoration-none px-0 py-1 d-none" to="/login">
            Sign in
          </Link>
        ) : (
          <Nav.Link
            className="text-lowercase small text-decoration-none px-0 py-1 text-muted d-none"
            disabled
          >
            Sign in
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link className="text-lowercase small text-decoration-none px-0 py-1" to="/shipping">
            Shipping
          </Link>
        ) : (
          <Nav.Link
            className="text-lowercase small text-decoration-none px-0 py-1 text-muted"
            disabled
          >
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link className="text-lowercase small text-decoration-none px-0 py-1" to="/payment">
            Payment method
          </Link>
        ) : (
          <Nav.Link
            className="text-lowercase small text-decoration-none px-0 py-1 text-muted"
            disabled
          >
            Payment method
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Link className="text-lowercase small text-decoration-none px-0 py-1" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <Nav.Link
            className="text-lowercase small text-decoration-none px-0 py-1 text-muted"
            disabled
          >
            Place order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
