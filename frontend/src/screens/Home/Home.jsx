import React, { useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";

import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../redux-store/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="d-flex align-items-center flex-column gap-5">
      <h3>Latest Products</h3>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
