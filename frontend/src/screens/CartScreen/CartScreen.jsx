import React, { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux-store/actions/cartActions";
import { Row, Col, ListGroup, Image, Form, Button, Card, Alert, Badge } from "react-bootstrap";
import toast from "react-hot-toast";
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
    toast.error("Item removed from cart");
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
      <hr />

      <Col md={8} className="my-3">
        {cartItems.length === 0 ? (
          <Alert variant="info" className="d-flex flex-column align-items-center text-center gap-3">
            Your cart is empty!!! <br />
            <Link to="/" className="btn btn-light w-25">
              Go back
            </Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} className="p-3 border mb-2">
                <Row className="mb-3">
                  <Col className="d-flex justify-content-center text-center">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                </Row>
                <Row className="text-center gap-1 align-items-center justify-content-center ">
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid={true} />
                  </Col>

                  <Col md={3} className="d-flex align-items-center justify-content-center gap-2">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(addToCart(item.product, Number(e.target.value)));
                        toast.success("Your cart has been updated");
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={4}>
                    <FaTimes
                      onClick={() => removeFromCartHandler(item.product)}
                      className="removeBtn"
                    />{" "}
                    ${item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <ListGroup variant="flush" className="my-3 text-center">
            <Card>
              <ListGroup.Item>
                <h4>Order Summary</h4>
                <hr />
                <h5>
                  <Badge bg="warning" className="px-2 rounded-circle">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>{" "}
                  {cartItems.length === 1 && "Item"}
                  {cartItems.length > 1 && "Items"}
                </h5>
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
