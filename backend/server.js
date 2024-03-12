const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }, // This is required if you're using a self-signed certificate
});

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON request bodies

// Login  route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  console.log("Username:" + email);
  console.log("Password:" + password);

  const selectUser = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [email, password];

  pool
    .query(selectUser, values)
    .then((response) => {
      if (response.rows.length > 0) {
        // User exists, login successful
        res.send("Login successful.");
      } else {
        // User not found, login failed
        res.status(401).send("Invalid email or password.");
      }
    })
    .catch((err) => {
      console.error(`Error querying database: ${err}`);
      res.status(500).send("Error logging in.");
    });
});

// Get all Student route

app.get("/students", async (req, res) => {
  try {
    const getAllStudents = `SELECT * FROM studentmgt`;
    const { rows } = await pool.query(getAllStudents);
    res.json(rows);
  } catch (error) {
    console.error(`Error getting students: ${error}`);
    res.status(500).send("Error getting students.");
  }
});

// Create a Student

app.post("/students", async (req, res) => {
  const { name, matricno, department, coursecode, score } = req.body;

  if (!name || !matricno || !department || !coursecode || !score) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const insertStudent = `INSERT INTO studentmgt (name, matricno, department, coursecode, score) VALUES ($1, $2, $3, $4, $5)`;
    const values = [name, matricno, department, coursecode, score];
    await pool.query(insertStudent, values);
    res.status(201).send("Student created successfully.");
  } catch (error) {
    console.error(`Error creating student: ${error}`);
    res.status(500).send("Error creating student.");
  }
});


// Update a Student
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, matricno, department, coursecode, score } = req.body;

  if (!name || !matricno || !department || !coursecode || !score) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const updateStudent = `
      UPDATE studentmgt 
      SET name = $1, matricNo = $2, department = $3, courseCode = $4, score = $5 
      WHERE id = $6`;
    const values = [name, matricno, department, coursecode, score, id];
    await pool.query(updateStudent, values);
    res.send("Student updated successfully.");
  } catch (error) {
    console.error(`Error updating student: ${error}`);
    res.status(500).send("Error updating student.");
  }
});

// Get a specific student by ID:

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getStudentById = `SELECT * FROM studentmgt WHERE id = $1`;
    const { rows } = await pool.query(getStudentById, [id]);

    if (rows.length === 0) {
      return res.status(404).send("Student not found.");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(`Error getting student: ${error}`);
    res.status(500).send("Error getting student.");
  }
});

// Delete a specific student by ID:
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteStudent = `DELETE FROM studentmgt WHERE id = $1`;
    await pool.query(deleteStudent, [id]);
    res.send("Student deleted successfully.");
  } catch (error) {
    console.error(`Error deleting student: ${error}`);
    res.status(500).send("Error deleting student.");
  }
});



app.listen(4000, () => console.log("Server on localport:4000"));
