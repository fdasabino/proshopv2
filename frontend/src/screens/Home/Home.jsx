import React, { useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";

import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";
import Paginate from "../../components/Paginate/Paginate";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../redux-store/actions/productActions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="d-flex align-items-center flex-column gap-5">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back
        </Link>
      )}
      <h3>Latest Products</h3>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </div>
  );
};

export default Home;
