const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4090;
app.use(express.json());

// Sequelize setup
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Define the User model
const Users = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Login route
app.post("/api/login", async (req, res) => {
  console.log("Login request received:");
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Check if password matches
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // If email and password are correct, send success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});