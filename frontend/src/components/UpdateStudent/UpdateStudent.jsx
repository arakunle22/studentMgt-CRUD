import React, { useState } from 'react';
import { Container, Form } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";

function UpdateStudent() {
  const [studentName, setStudentName] = useState('');
  const [department, setDepartment] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  }

  return (
    <div className="d-flex vh-100 bg-primary  justify-content-center align-items-center">
      <Container className="w-75 bg-white rounded container-fluid text-left  p-4">
        <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
        <div className="text-center mb-5">
              <BsFillPersonFill
                size={64}
                className="mb-2"
                style={{ color: "Blue" }}
              />
              <h2>Update Student</h2>
              </div>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Student Name'
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select className='form-control' value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>Select Department</option>
              <option>Department 1</option>
              <option>Department 2</option>
              <option>Department 3</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course Code</Form.Label>
            <Form.Select className='form-control' value={courseCode} onChange={(e) => setCourseCode(e.target.value)}>
              <option>Select Course Code</option>
              <option>EDM 301</option>
              <option>EDM 302</option>
              <option>EDM 303</option>
            </Form.Select>
    
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Score'
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </Form.Group>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateStudent;