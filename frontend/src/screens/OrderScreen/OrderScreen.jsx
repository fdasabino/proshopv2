import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails, payOrder, deliverOrder } from "../../redux-store/actions/orderActions";
import { Row, Col, ListGroup, Image, Card, Alert, Accordion, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { ORDER_CONSTANT_TYPES } from "../../redux-store/constants/orderConstants";
import { CART_CONSTANT_TYPES } from "../../redux-store/constants/cartConstants";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_CONSTANT_TYPES.ORDER_PAY_RESET });
      dispatch({ type: ORDER_CONSTANT_TYPES.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
        localStorage.setItem("cartItems", []);
        dispatch({ type: CART_CONSTANT_TYPES.CART_ITEMS_RESET });
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, navigate, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <Row>
      <h4>Order: {order._id}</h4>
      <hr />
      <Col md={7}>
        <h4>Shipping Information</h4>
        <hr />

        <ListGroup variant="flush">
          <ListGroup.Item>
            <p>
              <strong className="me-3 fw-bold">Customer:</strong>
              {order.user.name}
            </p>
            <p>
              <strong className="me-3 fw-bold">Email Address:</strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
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
            <h4>Order Items</h4>
            <hr />
            {order.orderItems.length === 0 ? (
              <Alert variant="warning">Your order is empty</Alert>
            ) : (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Review your order</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {order.orderItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                          <Row className="d-flex align-items-center justify-content-evenly">
                            <Col>
                              <Image src={item.image} alt={item.name} fluid />
                            </Col>

                            <Col className="small text-center">
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>

                            <Col className="small text-center">
                              {item.qty}x ${item.price}
                            </Col>

                            <Col className="small text-center fw-bold">
                              ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-evenly text-center">
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-evenly text-center">
                <Col>Tax:</Col>
                <Col>${order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="d-flex align-items-start justify-content-evenly text-center">
                <Col>Total:</Col>
                <Col>${order.totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
          </Card>
          <ListGroup.Item className="my-3">
            <h4>Payment Method</h4>
            <hr />
            <strong className="fw-bold me-3">Method:</strong>
            {order.paymentMethod}
          </ListGroup.Item>
          <ListGroup.Item>
            {order.isPaid && (
              <Alert variant="success">Order paid on: {order.paidAt.substring(0, 10)}</Alert>
            )}
            {!order.isPaid && <Alert variant="danger">Order not paid</Alert>}
          </ListGroup.Item>
          <ListGroup.Item>
            {loadingDeliver && <Spinner />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Button
                type="button"
                className="btn btn-block btn-secondary btn-sm mb-2"
                onClick={deliverHandler}
              >
                Mark as Delivered
              </Button>
            )}
            {order.isDelivered && (
              <Alert variant="success">
                Order delivered on: {order.deliveredAt.substring(0, 10)}
              </Alert>
            )}
            {!order.isDelivered && <Alert variant="danger">Order not delivered</Alert>}
          </ListGroup.Item>
          {!order.isPaid && (
            <ListGroup.Item>
              {loadingPay && <Spinner />}
              {!sdkReady ? (
                <Spinner />
              ) : (
                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
              )}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
