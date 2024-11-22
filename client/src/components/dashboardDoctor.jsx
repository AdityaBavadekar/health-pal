import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CalendarCheck2,
  Pen,
  NotepadText,
  Hospital,
  UserCircle,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import Cookies from "js-cookie";
import ApiConstants from "../constants/ApiConstants";

const DashboardDoctor = () => {
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const token = Cookies.get("jwt");
    fetch(ApiConstants.API_ME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-8">
            Doctor Dashboard
          </h1>

          {/* Hospital Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-emerald-100">
            <div className="flex items-center gap-6">
              <Hospital size={48} className="text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold text-emerald-900">
                  City Hospital
                </h2>
                <p className="text-emerald-600">123 Main Street, Springfield</p>
                <p className="text-emerald-600">Contact: (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-900">
                  Today's Appointments
                </h3>
                <CalendarCheck2 className="text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-600">8</p>
              <p className="text-emerald-600">Upcoming today</p>
            </div>

            {/* Total Patients */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-900">
                  Total Patients
                </h3>
                <UserCircle className="text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-600">145</p>
              <p className="text-emerald-600">Active patients</p>
            </div>

            {/* Pending Reports */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-900">
                  Pending Reports
                </h3>
                <NotepadText className="text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-600">3</p>
              <p className="text-emerald-600">Need review</p>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">
              Recent Patients
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  <tr className="hover:bg-emerald-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-emerald-900">
                      Jane Cooper
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-emerald-600">
                      Jan 15, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctor;
