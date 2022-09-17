import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux-store/actions/userActions";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again");
    } else {
      //dispatch update profile
    }
  };

  return (
    <Container className="d-flex flex-column gap-3">
      <h2 className="text-center">User Profile</h2>
      {message && <Alert variant="danger">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner />}
      <Row className="d-flex align-items-between">
        <Col md={9}>
          <h3>Orders</h3>
          <hr />
        </Col>

        <Col md={3}>
          <h3>Update Profile</h3>
          <hr />

          <Form
            onSubmit={submitHandler}
            className="d-flex align-items-center flex-column gap-3 text-center"
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
