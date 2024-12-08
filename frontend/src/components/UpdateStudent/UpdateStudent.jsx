import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [class_name, setClass] = useState("");
  const [department, setDepartment] = useState("");
  const [term, setTerm] = useState("");
  const [math, setMath] = useState("");
  const [english, setEnglish] = useState("");
  const [biology, setBiology] = useState("");
  const [economics, setEconomics] = useState("");
  const [chemistry, setChemistry] = useState("");
  const [physics, setPhysics] = useState("");
  const [account, setAccount] = useState("");
  const [commerce, setCommerce] = useState("");
  const [government, setGovernment] = useState("");
  const [literature, setLiterature] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); 
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        setClass(data.class_name);
        setDepartment(data.department);
        setTerm(data.term);
        setMath(data.math);
        setEnglish(data.english);
        setBiology(data.biology);
        setEconomics(data.economics);
        setChemistry(data.chemistry);
        setPhysics(data.physics);
        setAccount(data.account);
        setCommerce(data.commerce);
        setGovernment(data.government);
        setLiterature(data.literature);
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
            class_name,
            department,
            term,
            math,
            english,
            biology,
            economics,
            chemistry,
            physics,
            account,
            commerce,
            government,
            literature,
          }),
        }
      );
      if (response.ok) {
        setSuccessMessage(
          "Student updated successfully. Redirecting to Student details page..."
        );
        setShowModal(true);
        setTimeout(() => {
          // Navigate to the Student Details page of the updated student
          navigate(`/student/${id}`);
        }, 3000);
      } else {
        const errorMessage = await response.text();
        setError(`Failed to update student: ${errorMessage}`);
      }
    } catch (error) {
      console.error(`Error updating student: ${error}`);
      setError("Error updating student.");
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="d-flex  bg-light justify-content-center align-items-center">
      <Container className="w-75 bg-white rounded container-fluid text-left p-4">
        <Button
          variant="outline-light"
          onClick={handleHome}
          className="mx-2 my-2 text-black"
        >
          Home
        </Button>
        <div className="bg-success p-2 rounded text-center mb-4">
          <h2 className="text-white">Update Student</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formClass" className="my-2">
            <Form.Label>Class</Form.Label>
            <Form.Control
              as="select"
              value={class_name}
              onChange={(e) => setClass(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              <option value="SSS 1">SSS 1</option>
              <option value="SSS 2">SSS 2</option>
              <option value="SSS 3">SSS 3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTerm" className="my-2">
            <Form.Label>Term</Form.Label>
            <Form.Control
              as="select"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            >
              <option value="">Select Term</option>
              <option value="1st Term">1st Term</option>
              <option value="2nd Term">2nd Term</option>
              <option value="3rd Term">3rd Term</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDepartment" className="my-2">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="Science">Science</option>
              <option value="Commercial">Commercial</option>
              <option value="Art">Art</option>
            </Form.Control>
          </Form.Group>

          {/* Render additional fields based on department */}
          {department === "Science" && (
            <>
              {/* Science related fields */}
              <Form.Group controlId="formMath" className="my-2">
                <Form.Label>Math</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter math score"
                  value={math}
                  onChange={(e) => setMath(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEnglish" className="my-2">
                <Form.Label>English</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter English score"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBiology" className="my-2">
                <Form.Label>Biology</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Biology score"
                  value={biology}
                  onChange={(e) => setBiology(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEconomics" className="my-2">
                <Form.Label>Economics</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Economics score"
                  value={economics}
                  onChange={(e) => setEconomics(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formChemistry" className="my-2">
                <Form.Label>Chemistry</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Chemistry score"
                  value={chemistry}
                  onChange={(e) => setChemistry(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhysics" className="my-2">
                <Form.Label>Physics</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Physics score"
                  value={physics}
                  onChange={(e) => setPhysics(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {department === "Commercial" && (
            <>
              {/* Commercial related fields */}
              <Form.Group controlId="formMath" className="my-2">
                <Form.Label>Math</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter math score"
                  value={math}
                  onChange={(e) => setMath(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEnglish" className="my-2">
                <Form.Label>English</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter English score"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBiology" className="my-2">
                <Form.Label>Biology</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Biology score"
                  value={biology}
                  onChange={(e) => setBiology(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEconomics" className="my-2">
                <Form.Label>Economics</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Economics score"
                  value={economics}
                  onChange={(e) => setEconomics(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAccount" className="my-2">
                <Form.Label>Account</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account score"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCommerce" className="my-2">
                <Form.Label>Commerce</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Commerce score"
                  value={commerce}
                  onChange={(e) => setCommerce(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {department === "Art" && (
            <>
              {/* Art related fields */}
              <Form.Group controlId="formMath" className="my-2">
                <Form.Label>Math</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter math score"
                  value={math}
                  onChange={(e) => setMath(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEnglish" className="my-2">
                <Form.Label>English</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter English score"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBiology" className="my-2">
                <Form.Label>Biology</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Biology score"
                  value={biology}
                  onChange={(e) => setBiology(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEconomics" className="my-2">
                <Form.Label>Economics</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Economics score"
                  value={economics}
                  onChange={(e) => setEconomics(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGovernment" className="my-2">
                <Form.Label>Government</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Government score"
                  value={government}
                  onChange={(e) => setGovernment(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLiterature" className="my-2">
                <Form.Label>Literature</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Literature score"
                  value={literature}
                  onChange={(e) => setLiterature(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}

          {/* Add more Form.Group components for other fields */}

          <Container className="d-grid col-12 mx-auto my-3">
            <Button variant="outline-success" className="my-2" type="submit">
              Update Student
            </Button>
          </Container>
        </Form>
        {/* Footer Section */}
        <Row className="bg-success text-white text-center p-3 mt-5 justify-content-around align-items-center ">
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

        {/* Modal for Success Message */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <Alert variant="success">{successMessage}</Alert>
          </Modal.Body>
        </Modal>
        {/* End Modal for Success Message */}
      </Container>
    </div>
  );
};

export default UpdateStudent;
