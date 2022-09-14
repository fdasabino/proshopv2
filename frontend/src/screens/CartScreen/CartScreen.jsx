import React, { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux-store/actions/cartActions";
import { Row, Col, ListGroup, Image, Form, Button, Card, Alert, Badge } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const CartScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const qty = new URLSearchParams(location.search).get("qty");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, qty, id]);

  return (
    <Row className="d-flex justify-content-center align-items-start">
      <h3 className="text-center">Shopping Cart</h3>
      <Col md={8} className="my-3">
        {cartItems.length === 0 ? (
          <Alert variant="info" className="d-flex flex-column align-items-center text-center gap-3">
            Your cart is empty!!! <br />
            <Link to="/" className="btn btn-light w-25">
              Go back
            </Link>
          </Alert>
        ) : (
          <ListGroup variant="flush" className="position-relative">
            <Card>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="p-3">
                  <FaTimes
                    onClick={() => removeFromCartHandler(item.product)}
                    className="removebtn"
                  />
                  <Row className="text-center gap-1 align-items-center justify-content-center ">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid={true} />
                    </Col>
                    <Col md={4}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col lg={2} className="d-flex flex-column align-items-center">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </Card>
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <ListGroup variant="flush" className="my-3 text-center">
            <Card>
              <ListGroup.Item>
                <h4>
                  Subtotal{" "}
                  <Badge bg="info" className="px-2 rounded-circle">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>{" "}
                  items
                </h4>
                $
                {cartItems
                  .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;