import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BsEnvelope, BsLock, BsFillPersonFill } from "react-icons/bs";
import imageSrc from "../images/login.jpg";

function Login({ history }) { // Access history object through props

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response.data);
      // Handle successful login, such as redirecting to another page
      history.push("/Home"); // Redirect to home page
    } catch (error) {
      console.error(error.response.data);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container p-4">
        <Row className="align-items-center">
          <Col xs={12} sm={6} md={6} lg={6}>
            <img src={imageSrc} alt="login img" className="img-fluid" />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} style={{ textAlign: "left" }}>
            <div className="text-center mb-5">
              <BsFillPersonFill
                size={64}
                className="mb-2"
                style={{ color: "Blue" }}
              />
              <h2>Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-5">
                <div className="input-group">
                  <span className="input-group-text">
                    <BsEnvelope />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <BsLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <div className="form-group form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  className="form-check-label text-left"
                  htmlFor="rememberMe"
                >
                  Remember Me
                </label>
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
