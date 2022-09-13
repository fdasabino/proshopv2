import React from "react";

import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="my-3 text-center">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3 text-center">${product.price} </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
