import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dasboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Chat from "./pages/chat";
import PatientsList from "./pages/findPatients";
import PatientInfo from "./pages/patient";
import PrivateRoute from "./Routes/privateRoute";
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
        <Route
          path="/find-patients"
          element={
            <PrivateRoute>
              <Layout>
                <PatientsList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <PrivateRoute>
              <Layout>
                <PatientInfo />
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
