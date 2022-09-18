import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux-store/actions/cartActions";
import { Container, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import toast from "react-hot-toast";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const initialState = {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };

  const [address, setAddress] = useState(shippingAddress.address || initialState.address);
  const [city, setCity] = useState(shippingAddress.city || initialState.city);
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || initialState.postalCode
  );
  const [country, setCountry] = useState(shippingAddress.country || initialState.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    toast.success("Address saved successfully...");
    navigate("/payment");
  };

  return (
    <Container>
      <h3 className="text-center">Shipping Address</h3>
      <hr />
      <CheckoutSteps step1 step2 />
      <Form
        onSubmit={submitHandler}
        className="d-flex flex-column align-items-center gap-3 py-3 text-center"
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default ShippingScreen;
