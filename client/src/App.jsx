import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dasboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Chat from "./pages/chat";
import PrivateRoute from "./Routes/privateRoute";
import Navbar from "./components/layout/navbar";
import Layout from "./components/layout/layout";

function App() {
  return (
    <Router>
      {/* <Layout /> */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Layout>
                <Chat />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
