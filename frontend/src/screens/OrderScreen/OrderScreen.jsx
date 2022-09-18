import React, { useEffect } from "react";
import { getOrderDetails } from "../../redux-store/actions/orderActions";
import { Row, Col, ListGroup, Image, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const PlaceOrderScreen = () => {
  const { id } = useParams();
  const orderId = id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <Row>
      <Col md={7}>
        <h4>Order: {order._id}</h4>
        <hr />
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p>
              <strong className="me-3 fw-bold">Address:</strong>
              {order.shippingAddress.address}
            </p>
            <p>
              <strong className="me-3 fw-bold">City:</strong>
              {order.shippingAddress.city}
            </p>
            <p>
              <strong className="me-3 fw-bold">Postal Code:</strong>
              {order.shippingAddress.postalCode}
            </p>
            <p>
              <strong className="me-3 fw-bold">Country:</strong>
              {order.shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item className="my-3">
            <h4>Payment Method</h4>
            <hr />
            <strong className="fw-bold me-3">Method:</strong>
            {order.paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item className="my-3">
            <h4>Order Items</h4>
            <hr />
            {order.orderItems.length === 0 ? (
              <Alert variant="warning">Your order is empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-evenly text-center">
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-evenly text-center">
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-start justify-content-evenly text-center">
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </Card>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
