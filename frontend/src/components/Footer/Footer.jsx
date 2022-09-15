import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black">
      <Container>
        <Row>
          <Col className="text-center text-white py-3">
            &copy; Copyright - 2022 <br />
            <Navbar.Brand as={Link} to="/">
              <FaProjectDiagram /> PROSHOP
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
