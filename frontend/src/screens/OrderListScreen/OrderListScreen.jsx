import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../redux-store/actions/orderActions";
import { Container, Button, Row, Col, Alert, Accordion, ListGroup } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { FaMoneyBillWave, FaTruckMoving } from "react-icons/fa";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
      toast("You have been redirected");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Container className="d-flex flex-column gap-3">
      <h3 className="text-center">Manage orders</h3>
      <hr />
      <Row className="d-flex align-items-between">
        <Col>
          {loading && <Spinner />}
          {error && <Alert variant="danger">{error}</Alert>}
          {orders?.map((order) => (
            <ListGroup key={order._id} className="my-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <small>
                        <span className="mx-2">
                          <strong className="mx-2">NAME:</strong>
                          {order.user.name.toUpperCase()}
                        </span>
                      </small>
                      <small>
                        <span className="mx-2">
                          <strong className="mx-2">TOTAL:</strong> ${order.totalPrice}
                        </span>
                      </small>
                      {order.isPaid && (
                        <small>
                          <span className="mx-2">
                            <FaMoneyBillWave color="green" /> Paid
                          </span>
                        </small>
                      )}
                      {order.isDelivered && (
                        <small>
                          <span className="mx-2">
                            <FaTruckMoving color="green" /> Delivered
                          </span>
                        </small>
                      )}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>Name: {order?.user.name}</p>
                    <hr />
                    <p>
                      Email: <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
                    </p>
                    <hr />
                    <p>Date: {order.createdAt.substring(0, 10)}</p>
                    <hr />
                    <p>Total: ${order.totalPrice}</p>
                    <hr />
                    <p>
                      Paid:{" "}
                      {order.isPaid ? (
                        <span className="text-success mx-2 fw-bold">
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        "NO"
                      )}
                    </p>
                    <hr />
                    <p>
                      Delivered:
                      {order.isDelivered ? (
                        <span className="text-success mx-2 fw-bold">
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        "NO"
                      )}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between flex-wrap gap-3">
                      <Button
                        type="button"
                        className="btn block"
                        onClick={() => navigate(`/orders/${order._id}`)}
                      >
                        Details
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
export default OrderListScreen;
