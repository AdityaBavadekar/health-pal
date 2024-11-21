import React from "react";
import DashboardHospital from "../components/dashboardHospital";
import DashboardDoctor from "../components/dashboardDoctor";

const Dashboard = () => {
  return (
    <div className="px-5 py-3">
      <DashboardHospital />
      {/* <DashboardDoctor /> */}
    </div>
  );
};

export default Dashboard;
