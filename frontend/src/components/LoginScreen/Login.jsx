import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import imageSrc from "../images/login.jpg";

const Login = () => {
  const [loginType, setLoginType] = useState("studentId");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
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
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error during email login:", error);
      setError("An error occurred during login.");
    }
  };

  const handleIdLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://studentmgt-backend.onrender.com/students/${studentId}`
      );
      if (response.ok) {
        const data = await response.json();
        // Redirect to new page with student details
        navigate(`/studentReport/${studentId}`, { state: data });
      } else {
        console.error("Failed to fetch student details");
        // Handle error
        setError("Failed to fetch student details.");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      // Handle network errors or other exceptions
      setError("An error occurred while fetching student details.");
    }
  };

  const toggleLoginType = () => {
    setLoginType(loginType === "email" ? "studentId" : "email");
    setError("");
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
            {error && <Alert variant="danger">{error}</Alert>}
            {loginType === "email" ? (
              <div className="text-center mb-4 bg-primary rounded p-1">
                <BsFillPersonFill
                  size={60}
                  className="mb-1"
                  style={{ color: "White" }}
                />
                <h2 className="text-white">Staff Login</h2>
              </div>
            ) : (
              <div className="text-center mb-4 bg-primary rounded p-1">
                <BsFillPersonFill
                  size={60}
                  className="mb-1"
                  style={{ color: "White" }}
                />
                <h2 className="text-white">Student Login</h2>
              </div>
            )}
            {loginType === "email" ? (
              <Form onSubmit={handleEmailLogin}>
                <Form.Group controlId="formBasicEmail" className="my-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
                </Form.Group>
                <Button
                  variant="outline-primary"
                  className="my-2"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleIdLogin}>
                <Form.Group controlId="formBasicStudentId" className="my-3">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Your Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="outline-primary"
                  className="my-2"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}

            <Button variant="light" onClick={toggleLoginType}>
              {loginType === "email"
                ? " Student Login ( Student ID )"
                : "Staff Login"}
            </Button>
          </Col>
        </Row>
        {/* Footer Section */}
        <Row className="bg-primary text-white text-center p-3 mt-5 justify-content-around align-items-center ">
          <Col xs={12} lg={3}>
            <p className="fw-bold">Created by - PeaceCode</p>
          </Col>
          <Col xs={12} lg={3}>
            <p>
              Copyright © 2024
            </p>
          </Col>
          <Col xs={12} lg={3}>
            <p> Science and Technology (Computer option)</p>
          </Col>
        </Row>
        {/* End Footer Section */}
      </Container>
    </Container>
  );
};

export default Login;
