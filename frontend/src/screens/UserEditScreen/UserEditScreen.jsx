import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../redux-store/actions/userActions";
import { USER_CONSTANT_TYPES } from "../../redux-store/constants/userConstants";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_CONSTANT_TYPES.USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user._id, user.name, user.isAdmin, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, isAdmin }));
    navigate("/admin/userlist");
    toast.success("User details updated");
  };

  return (
    <Container className="d-flex align-items-center flex-column gap-5">
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <h3 className="text-center py-3">Edit user details</h3>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
        <hr />
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Spinner />}
          <Form onSubmit={submitHandler} className="d-flex align-items-center flex-column gap-3">
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
              <Form.Check
                type="checkbox"
                label="ADMIN ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update user
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserEditScreen;
