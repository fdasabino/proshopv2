import React, { useEffect } from "react";
import { createOrder } from "../../redux-store/actions/orderActions";
import { Button, Row, Col, ListGroup, Image, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = Number(itemsPrice > 100 ? 0 : 10);
  const taxPrice = Number(0.1 * itemsPrice.toFixed(2));
  const totalPrice =
    Number(itemsPrice.toFixed(2)) + Number(shippingPrice.toFixed(2)) + Number(taxPrice.toFixed(2));

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={7}>
          <h4>Shipping</h4>
          <hr />
          <ListGroup variant="flush">
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
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
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
        <Col md={5}>
          <h4>Order Summary</h4>
          <hr />
          <ListGroup variant="flush">
            <Card>
              <ListGroup.Item>
                <Row className="d-flex align-items-center justify-content-evenly text-center">
                  <Col>Items:</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="d-flex align-items-center justify-content-evenly text-center">
                  <Col>Shipping:</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="d-flex align-items-center justify-content-evenly text-center">
                  <Col>Tax:</Col>
                  <Col>${taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="d-flex align-items-start justify-content-evenly text-center">
                  <Col>Total:</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center flex-column text-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <Button
                  type="button"
                  className="btn btn-block "
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
