import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_CONSTANT_TYPES } from "../../redux-store/constants/userConstants";
import { getUserDetails, updateUserProfile } from "../../redux-store/actions/userActions";
import { Container, Form, Button, Row, Col, Alert, Accordion } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_CONSTANT_TYPES.USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again");
    } else {
      //dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, password }));
      toast.success("User profile updated...");
    }
  };

  return (
    <Container className="d-flex flex-column gap-3">
      <h3 className="text-center">User Profile</h3>
      {message && <Alert variant="danger">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner />}
      <Row className="d-flex align-items-between">
        <Col md={9}>
          <h4>Orders</h4>
          <hr />
        </Col>

        <Col md={3}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <hr /> <h5>Update Profile</h5>
              </Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
