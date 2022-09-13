import React from "react";

import Product from "../../components/Product/Product";

import { Row, Col } from "react-bootstrap";

import products from "../../products";

const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
