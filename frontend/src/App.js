// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginScreen/Login";
import Home from "./components/HomeScreen/Home";
import CreateStudent from "./components/CreateStudent/CreateStudent";
import UpdateStudent from "./components/UpdateStudent/UpdateStudent";
import StudentDetails from "./components/UpdateStudent/StudentDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CreateStudent" element={<CreateStudent />} />
        <Route path="/UpdateStudent/:id" element={<UpdateStudent />} />
        <Route path="/student/:id" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
