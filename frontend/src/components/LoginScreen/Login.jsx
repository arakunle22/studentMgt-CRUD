import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import imageSrc from "../images/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://studentmgt-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      navigate("/home");
    } else {
      const errorMessage = await response.text(); // Get the error message from the response
      setError(errorMessage);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-4"
    >
      <Container className="w-100 bg-white rounded">
        <Row className="justify-content-around align-items-center">
          <Col xs={12} sm={6} md={5} lg={5}>
            <img src={imageSrc} alt="login img" className="img-fluid" />
          </Col>
          <Col
            xs={12}
            sm={6}
            md={5}
            lg={5}
            className="justify-content-center align-items-center"
            style={{ textAlign: "left" }}
          >
            <div className="text-center mb-4 bg-primary rounded p-1">
              <BsFillPersonFill
                size={60}
                className="mb-1"
                style={{ color: "White" }}
              />
              <h2 className="text-white">Login</h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="my-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* Validation message */}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* Validation message */}
              </Form.Group>
              <Container className="d-grid  col-md-12 mx-auto my-3">
                <Button
                  variant="outline-primary"
                  className="my-2"
                  type="submit"
                >
                  Submit
                </Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
