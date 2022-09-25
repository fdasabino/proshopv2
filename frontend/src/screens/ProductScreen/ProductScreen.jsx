import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../../redux-store/actions/productActions";
import { PRODUCT_CONSTANT_TYPES } from "../../redux-store/constants/productConstants";
import Rating from "../../components/Rating/Rating";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { FaRegCalendarAlt, FaRegHandshake, FaStar, FaUserAlt } from "react-icons/fa";
import { GiNothingToSay } from "react-icons/gi";

const ProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CONSTANT_TYPES.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    toast.success("Item added to cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={3}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews}`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="text-center">{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      className="btn btn-block w-100"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center my-4">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Alert variant="info">No Reviews for this product yet</Alert>
              )}
              {product?.reviews.map((review) => (
                <Alert variant="info" key={review._id}>
                  <FaStar className="mx-2" /> {review.rating} {review.rating === 1 && "star"}{" "}
                  {review.rating > 1 && "stars"}
                  <br />
                  <FaRegCalendarAlt className="mx-2" /> {review.createdAt.substring(0, 10)}
                  <br />
                  <FaUserAlt className="mx-2" /> {review.name} <br />
                  <GiNothingToSay className="mx-2" />
                  {review.comment} <br />
                </Alert>
              ))}
            </Col>
            <Col md={6}>
              {!userInfo && (
                <Alert variant="secondary">
                  <h6>Please sign in to write a review</h6>
                </Alert>
              )}
              {userInfo && (
                <>
                  <h6>Write a customer Review</h6>
                  {errorProductReview && <Alert variant="danger">{errorProductReview}</Alert>}
                  {successProductReview && (
                    <Alert variant="success">
                      Thanks for your feedback <FaRegHandshake />
                    </Alert>
                  )}
                  <Form>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Okay</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="d-flex flex-column">
                      <Form.Label>Leave a Comment</Form.Label>
                      <Form
                        as="textarea"
                        type="text"
                        style={{ height: "100px" }}
                        value={comment}
                        placeholder="Enter Product Review"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="my-3"
                      type="submit"
                      variant="primary"
                      onClick={submitHandler}
                    >
                      Submit Review
                    </Button>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
