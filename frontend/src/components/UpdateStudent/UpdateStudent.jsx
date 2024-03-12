import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [matricno, setMatricNo] = useState("");
  const [department, setDepartment] = useState("");
  const [coursecode, setCourseCode] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://studentmgt-backend.onrender.com/students/${id}`
        );
        if (!response.ok) {
          throw new Error("Student not found.");
        }
        const data = await response.json();
        setName(data.name);
        setMatricNo(data.matricno);
        setDepartment(data.department);
        setCourseCode(data.coursecode);
        setScore(data.score);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching student data: ${error}`);
        setError("Error fetching student data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://studentmgt-backend.onrender.com/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            matricno,
            department,
            coursecode,
            score,
          }),
        }
      );
      if (response.ok) {
        setSuccessMessage(
          "Student updated successfully. Redirecting to home page..."
        ); // Set success message on successful update
        setTimeout(() => {
          navigate("/home");
        }, 3000); // Navigate to home page after 3 seconds
      } else {
        const errorMessage = await response.text();
        setError(`Failed to update student: ${errorMessage}`);
      }
    } catch (error) {
      console.error(`Error updating student: ${error}`);
      setError("Error updating student.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <Container className="w-75 bg-white rounded container-fluid text-left p-4">
        <div className="bg-success p-2 rounded text-center mb-4">
          <h2 className="text-white">Update Student</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}{" "}
        {/* Render success message */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicMatricNo" className="my-2">
            <Form.Label>Matric No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter matric number"
              value={matricno}
              onChange={(e) => setMatricNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDepartment" className="my-2">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicCourseCode" className="my-2">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course code"
              value={coursecode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicScore" className="my-2">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </Form.Group>
          <Container className="d-grid  col-12 mx-auto my-3">
            <Button variant="outline-success" className="my-2" type="submit">
              Update
            </Button>
          </Container>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateStudent;
