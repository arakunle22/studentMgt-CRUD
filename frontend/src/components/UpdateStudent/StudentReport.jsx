import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  //   Modal,
  //   Alert,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function StudentReport() {
  const { id } = useParams();
  //   const [showConfirmation, setShowConfirmation] = useState(false);
  //   const [deletionSuccess, setDeletionSuccess] = useState(false);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

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

  fetchStudentDetails(); // Fetch student details immediately when the component mounts

  const handleLogout = () => {
    navigate("/");
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

  if (!student) {
    return (
      <div className="min-vh-100 p-5 bg-light justify-content-center align-items-center">
        <p className=" card rounded p-5">Loading...</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center">
      <style>
        {`
         @media print {
            body * {
                visibility: hidden;
              }
            .print-section {
              width: 100%;
              overflow: hidden;
            }
            .print-section * {
              visibility: visible;
            }
            .print-section {
              position: absolute;
              text-align: center;
              left: 50px;
              top: 10px;
            }
            .table {
              font-size: 14px;
            }
          }
        `}
      </style>
      <Container className="w-100 bg-white rounded container-fluid text-left my-3 mx-2 p-4">
        <Button
          variant="outline-light"
          onClick={handleLogout}
          className="mx-2 my-2 text-black"
        >
          Logout
        </Button>
        <div className="bg-success mb-4 rounded p-4 d-flex justify-content-between align-items-center">
          <h2 className="text-center text-white mt-3 mb-3">
            Welcome {student.name}
          </h2>
          <Button variant="outline-light" onClick={() => window.print()}>
            Print Report
          </Button>
        </div>

      

        <div className="container print-section" style={{ overflowX: "auto" }}>
          <Table
            bordered
            variant="secondary"
            hover
            className="text-center mb-4"
          >
            <thead>
              <tr>
                <th>Academic Report</th>
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
            </tbody>
          </Table>

          <Table striped className="mb-5 text-center">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Exam Score (100)</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </Table>

          <Table variant="secondary" className="text-center">
            <tbody>
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
                <td className="fw-bold fs-4">{percentage.toFixed(2)}%</td>
              </tr>
              <tr className="fade-in">
                <td className="fw-bold">||</td>
                <td className="fw-bold">||</td>
              </tr>
              <tr className="fade-in">
                <td className="fw-bold">Remark ~ </td>
                <td className="fw-bold text-wrap" style={{ width: "40rem" }}>
                  {percentage > 70 ? (
                    <>
                      Excellent work this term! Your dedication and effort have
                      clearly paid off. Keep up the great work and continue
                      striving for excellence next term.
                    </>
                  ) : (
                    "Your effort this term has been noted, but there's room for improvement. Keep working hard, and I believe you can achieve better results next term."
                  )}
                </td>
              </tr>
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
      </Container>

     
    </div>
  );
}

export default StudentReport;
