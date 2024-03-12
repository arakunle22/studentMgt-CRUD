import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";

function Home() {
  const [students, setStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Added state for success message
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [deletionSuccess]);

  useEffect(() => {
    // Filter students based on search query
    const filteredStudents = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.matricno.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(filteredStudents);
  }, [searchQuery, students]);

  useEffect(() => {
    // Show success message for 3 seconds after deletion success
    if (deletionSuccess) {
      setShowSuccessMessage(true);
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
        setDeletionSuccess(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [deletionSuccess]);

  const fetchStudents = async () => {
    // Fetch students from server
    try {
      const response = await fetch(
        "https://studentmgt-backend.onrender.com/students"
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddClick = () => {
    navigate("/CreateStudent");
  };

  const handleUpdateClick = (id) => {
    navigate(`/UpdateStudent/${id}`);
  };

  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(
        `https://studentmgt-backend.onrender.com/students/${studentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setShowConfirmation(false);
  };

  const handleLogout = () => {
    // Implement logout functionality here, such as clearing authentication tokens or session data
    // Then redirect the user back to the login page
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container-fluid text-left my-5 mx-2 p-4">
        {showSuccessMessage && ( // Added the condition to display success message
          <Alert variant="success">Student deleted successfully.</Alert>
        )}
        <Row className="justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <Button variant="success" onClick={handleAddClick}>
              Add +
            </Button>
          </Col>

          <Col xs="auto">
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-between align-items-center mb-4">
          <Col xs={3}>
            <div></div>{" "}
            {/* This empty div ensures that the search bar is on the left */}
          </Col>
          <Col xs={12} sm={6}>
            <Form.Control
              className="mx-auto" // Add mx-auto class to center the search bar horizontally
              type="text"
              placeholder="Search by Name or Matric No"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={3}>
            <div></div>{" "}
            {/* This empty div ensures that the search bar is on the right */}
          </Col>
        </Row>

        {searchResults.length === 0 && ( // Render text if search results are empty
          <p>No results found.</p>
        )}
        <div className="container-fluid" style={{ overflowX: "auto" }}>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Matric No</th>
                <th>Department</th>
                <th>Course Code</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student) => (
                <tr key={student.id} className="fade-in">
                  <td>{student.name}</td>
                  <td>{student.matricno}</td>
                  <td>{student.department}</td>
                  <td>{student.coursecode}</td>
                  <td>{student.score}</td>
                  <td className="">
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateClick(student.id)}
                      className="mx-2 my-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => handleDeleteClick(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
