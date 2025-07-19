import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Chat from "./pages/chat";
import PatientsList from "./pages/findPatients";
import PatientInfo from "./pages/patient";
import HealthRecords from "./pages/healthRecords";
import NotFound from "./pages/notFound";
import PrivateRoute from "./Routes/privateRoute";
import ManageDoctors from "../src/pages/hospitalDoctos";
import HospitalsList from "./pages/findHospitals";
import AppointmentsList from "./pages/appointments";
import Layout from "./components/layout/layout";
import Cookies from "js-cookie";
import RemindersPage from "./pages/reminder";
import SettingsHospital from "./pages/settings";
import PatientReports from "./pages/patientReports";

function App() {
  const isAuthenticated = Cookies.get("jwt");

  return (
    <Router>
      <Routes>
        {/* Redirect root path based on authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />

        {/* Protected Routes */}
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
        <Route
          path="/manage-doctors"
          element={
            <PrivateRoute>
              <Layout>
                <ManageDoctors />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <SettingsHospital />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reminder"
          element={
            <PrivateRoute>
              <Layout>
                <RemindersPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Layout>
                <AppointmentsList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Layout>
                <HospitalsList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient-reports"
          element={
            <PrivateRoute>
              <Layout>
                <PatientReports />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
