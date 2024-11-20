import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dasboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Navbar from "./components/navbar";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
