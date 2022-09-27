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
      <h3>Top rated products</h3>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules
        className="mySwiper"
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
