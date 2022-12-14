import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../redux-store/actions/userActions";
import { Container, Button, Row, Col, Alert, Accordion, ListGroup } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
      toast("You have been redirected");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      toast("User has been deleted...");
    }
  };

  return (
    <Container className="d-flex flex-column gap-3">
      <h3 className="text-center">Manage users</h3>
      <hr />
      <Row className="d-flex align-items-between">
        <Col>
          {loading && <Spinner />}
          {error && <Alert variant="danger">{error}</Alert>}
          {users?.map((user) => (
            <ListGroup key={user._id} className="my-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{user.name.toUpperCase()}</Accordion.Header>
                  <Accordion.Body>
                    <p>Name: {user.name}</p>
                    <hr />
                    <p>
                      Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                    <hr />
                    <p>Admin: {user.isAdmin ? "YES" : "NO"}</p>
                    <hr />
                    <div className="d-flex justify-content-between flex-wrap gap-3">
                      <Button
                        type="button"
                        className="btn block"
                        onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                      >
                        Edit Details
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="btn block"
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        Delete User
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ListGroup>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default UserListScreen;
