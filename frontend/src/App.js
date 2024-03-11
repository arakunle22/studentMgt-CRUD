import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LoginScreen/Login';
// import Home from './components/HomeScreen/Home';
// import CreateStudent from './components/CreateStudent/CreateStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path= "/"  element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
