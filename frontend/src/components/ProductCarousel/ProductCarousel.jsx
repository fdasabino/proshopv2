import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import { listTopProducts } from "../../redux-store/actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./ProductCarousel.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopReviews = useSelector((state) => state.productTopReviews);
  const { error, loading, products } = productTopReviews;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <>
      <Swiper className="mySwiper">
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <img src={product.image} alt={product.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
