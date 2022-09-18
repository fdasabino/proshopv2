import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux-store/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import toast from "react-hot-toast";

const PaymentMethodScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    toast.success(`Payment method selected: ${paymentMethod}`);
    navigate("/placeorder");
  };

  return (
    <Container>
      <h3 className="text-center">Payment Method</h3>
      <hr />
      <CheckoutSteps step1 step2 step3 />
      <Form
        onSubmit={submitHandler}
        className="d-flex flex-column align-items-center gap-3 py-3 text-center"
      >
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            label="Paypal or Credit-Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentMethodScreen;
