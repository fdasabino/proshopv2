import React, { useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <h4>Shipping</h4>
            <hr />
            <ListGroup.Item>
              <p>
                <strong className="me-3 fw-bold">Address:</strong>
                {cart.shippingAddress.address}
              </p>
              <p>
                <strong className="me-3 fw-bold">City:</strong>
                {cart.shippingAddress.city}
              </p>
              <p>
                <strong className="me-3 fw-bold">Postal Code:</strong>
                {cart.shippingAddress.postalCode}
              </p>
              <p>
                <strong className="me-3 fw-bold">Country:</strong>
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="my-3">
              <h4>Payment Method</h4>
              <hr />
              <strong className="fw-bold me-3">Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="my-3">
              <h4>Order Items</h4>
              <hr />
              {cart.cartItems.length === 0 ? (
                <Alert variant="warning">Your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="d-flex align-items-center justify-content-evenly">
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>

                        <Col className="small text-center">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col className="small text-center">
                          {item.qty}x ${item.price}
                        </Col>

                        <Col className="small text-center fw-bold">${item.qty * item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Order Summary</h4>
              <hr />
              <Row className="d-flex align-items-center justify-content-evenly text-center">
                <Col>Items</Col>
                <Col>$13213</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
