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
import ManageDoctors from "./pages/hospitalDoctos";
import Layout from "./components/layout/layout";
import Cookies from "js-cookie";
import RemindersPage from "./pages/reminder";

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
<<<<<<< HEAD
          path="/reminder"
          element={
            <Layout>
              <RemindersPage />
            </Layout>
          }
        />
=======
          path="/manage-doctors"
          element={
            <PrivateRoute>
              <Layout>
                <ManageDoctors />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/reminder" element={<RemindersPage />} />
>>>>>>> 774f9ebaf094858d702a0cb8642a7a55b1c73542
        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
