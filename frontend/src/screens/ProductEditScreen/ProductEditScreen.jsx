import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../../redux-store/actions/productActions";
import { PRODUCT_CONSTANT_TYPES } from "../../redux-store/constants/productConstants";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_CONSTANT_TYPES.PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
      toast.success(`Product "${product.name}" was updated successfully`);
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, id, product, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({ _id: id, name, price, brand, category, image, description, countInStock })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center flex-column gap-5">
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <div className="text-center">
          <h3 className="py-3">Edit product details</h3>
          <h5 className="py-3">{product.name}</h5>
        </div>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
        <hr />
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Spinner />}
          <Form onSubmit={submitHandler} className="d-flex align-items-center flex-column gap-3">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Add Image URL or upload a file </Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <Form.Control
                type="file"
                label="Choose File"
                custom="true"
                onChange={uploadFileHandler}
              />
              {uploading && <Spinner />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Product Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                style={{ height: "100px" }}
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductEditScreen;
