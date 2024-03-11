import React from "react";
import { Container, Table } from "react-bootstrap";

function Home() {
  return (
    <div className="d-flex vh-100 bg-primary  justify-content-center align-items-center">
      <Container className="w-100 bg-white rounded container-fluid text-left  p-4">
        <div style={{ textAlign: "left" }}>
          <button className="btn btn-success">Add +</button>
        </div>
        <div className="container-fluid" style={{ overflow: "hidden" }}>
          <Table className="p-5 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Course Code</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Example Student</td>
                <td>Educational Technology</td>
                <td>EDT 321</td>
                <td>67</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                  <button className="btn btn-danger ms-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
// style={{ overflow: "hidden" }}

export default Home;
