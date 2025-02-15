import React, { useState } from "react";
import DashboardHospital from "../components/dashboardHospital";
import DashboardDoctor from "../components/dashboardDoctor";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PatientDashboard from "../components/dashboardPatient";

const Dashboard = () => {
  const token = Cookies.get("jwt");

  const user = jwtDecode(token);
  const [userType, setUserType] = useState(user.type);
  console.log(userType);
  return (
    <div className="">
      {userType === "Hospital" ? (
        <DashboardHospital />
      ) : userType == "Doctor" ? (
        <DashboardDoctor />
      ) : (
        <PatientDashboard />
      )}
    </div>
  );
};

export default Dashboard;
