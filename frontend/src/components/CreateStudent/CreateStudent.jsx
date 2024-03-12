import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [matricno, setMatricNo] = useState("");
  const [department, setDepartment] = useState("");
  const [coursecode, setCourseCode] = useState("");
  const [score, setScore] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (showSuccessMessage) {
      timeout = setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/home");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSuccessMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation if needed

    // Example: Send data to the backend API to create a new student
    try {
      const response = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, matricno, department, coursecode, score }),
      });

      if (response.ok) {
        // Student created successfully
        setShowSuccessMessage(true);
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error creating student:", error);
      setErrorMessage("Error creating student. Please try again later.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <Container className="w-75 bg-white rounded container-fluid text-left p-4">
        <h2>Create New Student</h2>
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
        {showSuccessMessage && (
          <Alert variant="success">
            Student created successfully. Redirecting to home page...
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMatricNo">
            <Form.Label>Matriculation Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter matriculation number"
              value={matricno}
              onChange={(e) => setMatricNo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCourseCode">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course code"
              value={coursecode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formScore">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateStudent;
