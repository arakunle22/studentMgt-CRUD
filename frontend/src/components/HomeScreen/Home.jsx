import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [deletionSuccess]);

  useEffect(() => {
    const filteredStudents = students.filter((student) => {
      const { name, class_name } = student;
      return (
        (name && name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (class_name &&
          class_name.toLowerCase().includes(searchQuery.toLowerCase())) 
      );
    });
    setSearchResults(filteredStudents);
  }, [searchQuery, students]);

  const fetchStudents = async () => {
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


  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container-fluid text-left my-3 mx-2 p-4">
        <div className="bg-success mb-4 rounded">
          <h1 className="text-center text-white mt-3 mb-5 p-4">
            Welcome to Student Information Management System
          </h1>
        </div>

        <Row className="justify-content-between align-items-center mb-4">
          <Col xs="auto">
            <Button variant="outline-success" onClick={handleAddClick}>
              Add Student +
            </Button>
          </Col>

          <Col xs="auto">
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-between align-items-center mb-5">
          <Col xs={3}>
            <div></div>{" "}
            {/* This empty div ensures that the search bar is on the left */}
          </Col>
          <Col xs={12} sm={6}>
            <Form.Control
              className="mx-auto" // Add mx-auto class to center the search bar horizontally
              type="text"
              placeholder="Search by Student Name or Class"
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
        <div className="container w-100" style={{ overflowX: "auto" }}>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                {/* <th>Department</th> */}
                {/* <th>Term</th>
                <th>Math Score</th>
                <th>English Score</th>
                <th>Biology Score</th>
                <th>Economics Score</th>
                <th>Chemistry Score</th>
                <th>Physics Score</th>
                <th>Account Score</th>
                <th>Commerce Score</th>
                <th>Government Score</th>
                <th>Literature Score</th>
                <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student) => (
                
                <tr key={student.id} className="fade-in">
                  <td>{student.id}</td>
                  <td>
                    <Link
                      className="btn btn-outline-light text-black"
                      to={`/student/${student.id}`}
                    ><b>
                      {student.name}
                      </b>
                    </Link>
                  </td>
                  <td>{student.class_name}</td>
                  {/* <td>{student.department}</td> */}
                  {/* <td>{student.term}</td>
                  <td>{student.math}</td>
                  <td>{student.english}</td>
                  <td>{student.biology}</td>
                  <td>{student.economics}</td>
                  <td>{student.chemistry}</td>
                  <td>{student.physics}</td>
                  <td>{student.account}</td>
                  <td>{student.commerce}</td>
                  <td>{student.government}</td>
                  <td>{student.literature}</td>
                  <td className="">
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateClick(student.id)}
                      className="mx-2 my-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mx-1"
                      onClick={() => handleDeleteClick(student.id)}
                    >
                      Delete
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Footer Section */}
        <Row className="bg-light  text-center p-3 mt-5 justify-content-around align-items-center ">
          <Col xs={12} lg={3}>
            <p className="fw-bold">Created by - PeaceCode</p>
          </Col>
          <Col xs={12} lg={3}>
            <p>
              Copyright © 2024
            </p>
          </Col>
          <Col xs={12} lg={3}>
            <p>Science and Technology (Computer option)</p>
          </Col>
        </Row>
        {/* End Footer Section */}

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
            {/* <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button> */}
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
      </Container>
    </div>
  );
}

export default Home;
