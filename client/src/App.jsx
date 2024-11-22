import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dasboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Chat from "./pages/chat";
import PatientsList from "./pages/findPatients";
import PatientInfo from "./pages/patient";
import HealthRecords from "./pages/healthRecords";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import PrivateRoute from "./Routes/privateRoute";
import Layout from "./components/layout/layout";
import Cookies from 'js-cookie';

function App() {
  return (
    <Router>
      {/* <Layout /> */}
      <Routes>
        <Route path="/" element = {<Home />}/>
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
          path="/health-records"
          element={
            <PrivateRoute>
              <Layout>
                <HealthRecords />
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={
          (Cookies.get('jwt')) ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />
        } />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
