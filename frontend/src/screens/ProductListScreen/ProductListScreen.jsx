import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../../redux-store/actions/productActions";
import { Container, Button, Row, Col, Alert, Accordion, ListGroup } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { FaTrashAlt, FaPlus, FaStar, FaTags } from "react-icons/fa";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
      toast("You have been redirected");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // delete the product
      dispatch(deleteProduct(id));
      toast("Product deleted...");
    }
  };

  const createProductHandler = (product) => {
    console.log("Click");
  };

  return (
    <Container className="d-flex flex-column gap-3">
      <h3 className="text-center">Manage products</h3>
      <hr />
      <Row className="d-flex align-items-between">
        <Col>
          <Button variant="primary" onClick={createProductHandler}>
            <FaPlus className="mx-2" /> Add Product
          </Button>
          {loading && <Spinner />}
          {loadingDelete && <Spinner />}
          {error && <Alert variant="danger">{error}</Alert>}
          {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
          {products?.map((product) => (
            <ListGroup key={product._id} className="my-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <strong>{product.name.toUpperCase()}</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <FaTags className="mx-2" /> ID: {product._id}
                    </p>
                    <hr />
                    <p>
                      <FaTags className="mx-2" /> Name: {product.name}
                    </p>
                    <hr />
                    <p>
                      <FaTags className="mx-2" /> Brand: {product.brand.toUpperCase()}
                    </p>
                    <hr />
                    <p>
                      <FaTags className="mx-2" /> Category: {product.category.toUpperCase()}
                    </p>
                    <hr />
                    <p>
                      <FaTags className="mx-2" /> Price: ${product.price}
                    </p>
                    <hr />
                    <p>
                      <FaTags className="mx-2" /> In Stock:{" "}
                      {product.countInStock ? product.countInStock : "NO"}
                    </p>
                    <hr />
                    <p className="d-flex align-items-center">
                      <FaTags className="mx-2" /> Rating: {product.rating ? product.rating : "NO"}{" "}
                      <FaStar color="gold" />
                    </p>
                    <hr />

                    <div>
                      <Row>
                        <Col className="d-flex justify-content-center flex-wrap gap-3">
                          <Button
                            type="button"
                            className="btn block"
                            onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                          >
                            Edit Details
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            className="btn block "
                            onClick={() => deleteProductHandler(product._id)}
                          >
                            Delete Product
                            <FaTrashAlt className="mx-2" />
                          </Button>
                        </Col>
                      </Row>
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

export default ProductListScreen;
