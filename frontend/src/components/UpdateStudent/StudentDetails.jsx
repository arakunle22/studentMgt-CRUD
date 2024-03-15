import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Alert,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function StudentDetails() {
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  //   const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
    // eslint-disable-next-line
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(
        `https://studentmgt-backend.onrender.com/students/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        console.error("Failed to fetch student details");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleUpdateClick = () => {
    navigate(`/UpdateStudent/${id}`);
  };

  const handleDeleteClick = (id) => {
    // setStudentIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`https://studentmgt-backend.onrender.com/students/${id}`, {
        method: "DELETE",
      });
      setDeletionSuccess(true);

      // Set a timeout to redirect after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setShowConfirmation(false);
  };

  let totalScore = 0;
  let percentage = 0;

  if (student) {
    totalScore =
      parseFloat(student.math ?? 0) +
      parseFloat(student.english ?? 0) +
      parseFloat(student.biology ?? 0) +
      parseFloat(student.economics ?? 0) +
      parseFloat(student.chemistry ?? 0) +
      parseFloat(student.physics ?? 0) +
      parseFloat(student.account ?? 0) +
      parseFloat(student.commerce ?? 0) +
      parseFloat(student.government ?? 0) +
      parseFloat(student.literature ?? 0);

    percentage = (totalScore / 600) * 100;
  }

  // Render the rest of your component

  if (!student) {
    return (
      <div className="min-vh-100 p-5 bg-light justify-content-center align-items-center">
        <p className=" card rounded p-5">Loading...</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container-fluid text-left my-3 mx-2 p-4">
        <Button
          variant="outline-light"
          onClick={handleHome}
          className="mx-2 my-2 text-black"
        >
          Home
        </Button>
        <div className="bg-success mb-4 rounded">
          <h2 className="text-center text-white mt-3 mb-5 p-4">
            Academic Report of :: "{student.name}"
          </h2>
        </div>

        <Row className="justify-content-between align-items-center mb-4">
          <Col xs="auto">
            <Button
              variant="outline-light"
              onClick={() => handleUpdateClick(student.id)}
              className="mx-2 my-2 text-black"
            >
              Update
            </Button>
          </Col>

          <Col xs="auto">
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteClick(student.id)}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <div className="container" style={{ overflowX: "auto" }}>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>::</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fade-in">
                <td>Name Of Student</td>
                <td className="fw-bold ">{student.name}</td>
              </tr>

              <tr className="fade-in">
                <td>Class</td>
                <td className="fw-bold">{student.class_name}</td>
              </tr>
              <tr className="fade-in">
                <td>Term (Session)</td>
                <td className="fw-bold">{student.term}</td>
              </tr>

              <tr className="fade-in">
                <td>Department</td>
                <td className="fw-bold">{student.department}</td>
              </tr>

              <tr>
                <td>::</td>
                <td>::</td>
              </tr>

              <tr className="fade-in">
                <td>Mathematics Score</td>
                <td className="fw-bold">{student.math}</td>
              </tr>

              <tr className="fade-in">
                <td>English Score</td>
                <td className="fw-bold">{student.english}</td>
              </tr>

              <tr className="fade-in">
                <td>Biology Score</td>
                <td className="fw-bold">{student.biology}</td>
              </tr>

              <tr className="fade-in">
                <td>Economics Score</td>
                <td className="fw-bold">{student.economics}</td>
              </tr>

              <tr className="fade-in">
                <td>Chemistry Score</td>
                <td className="fw-bold">{student.chemistry}</td>
              </tr>

              <tr className="fade-in">
                <td>Physics Score</td>

                <td className="fw-bold">{student.physics}</td>
              </tr>

              <tr className="fade-in">
                <td>Account Score</td>

                <td className="fw-bold">{student.account}</td>
              </tr>

              <tr className="fade-in">
                <td>Commerce Score</td>

                <td className="fw-bold">{student.commerce}</td>
              </tr>

              <tr className="fade-in">
                <td>Government Score</td>

                <td className="fw-bold">{student.government}</td>
              </tr>

              <tr className="fade-in">
                <td>Literature Score</td>

                <td className="fw-bold">{student.literature}</td>
              </tr>
              <tr>
                <td className="fw-bold">::</td>
                <td className="fw-bold">::</td>
              </tr>
              <tr className="fade-in">
                <td>Total Score</td>
                <td className="fw-bold">{totalScore}</td>
              </tr>
              <tr className="fade-in">
                <td className="fw-bold">End of {student.term} Percentage</td>
                <td className="fw-bold">{percentage.toFixed(2)}%</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* Footer Section */}
        <Row className="bg-light  text-center p-3 mt-5 justify-content-around align-items-center ">
          <Col xs={12} lg={3}>
            <p className="fw-bold">Created by - Ajayi Oluwatobiloba Deborah</p>
          </Col>
          <Col xs={12} lg={3}>
            <p>
              Matric Number: 190115010 <br /> Copyright © 2024
            </p>
          </Col>
          <Col xs={12} lg={3}>
            <p>Department: Science and Technology (Computer option)</p>
          </Col>
        </Row>
        {/* End Footer Section */}
      </Container>

      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
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

      {/* Success Message Modal */}
      <Modal
        show={deletionSuccess}
        onHide={() => setDeletionSuccess(false)}
        centered
      >
        <Modal.Body className="text-center">
          <Alert variant="success">Student deleted successfully.</Alert>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentDetails;
