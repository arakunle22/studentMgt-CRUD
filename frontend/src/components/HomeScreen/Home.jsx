import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, Modal, Alert  } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import "./Home.css"; // Import CSS file for animations

function Home() {
  const [students, setStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  // eslint-disable-next-line
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control visibility of success message
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [deletionSuccess]);

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
      const response = await fetch("https://studentmgt-backend.onrender.com/students");
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
      await fetch(`https://studentmgt-backend.onrender.com/students/${studentIdToDelete}`, {
        method: "DELETE",
      });
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setShowConfirmation(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container-fluid text-left p-4">
        
      {/* Deletion Success Message */}
      {deletionSuccess && (
        <Alert variant="success" lassName="position-absolute top-0 start-50 translate-middle-x" style={{ zIndex: 999 }}>
          Student deleted successfully.
        </Alert>
      )}
        <Row style={{ textAlign: "left", marginBottom: "20px" }}>
          <Col>
          <Button variant="success" onClick={handleAddClick}>
            Add +
          </Button>
          </Col>
          <Col>
          {/* Search Bar to Get A student by Matric Number or Name */}
         
          </Col>
        </Row>
        <div className="container-fluid" style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
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
              {students.map((student) => (
                <tr key={student.id} className="fade-in">
                  <td>{student.name}</td>
                  <td>{student.matricno}</td>
                  <td>{student.department}</td>
                  <td>{student.coursecode}</td>
                  <td>{student.score}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateClick(student.id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDeleteClick(student.id)} // Call handleDeleteClick on click
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
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
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
