import {
  Search,
  CalendarCheck2,
  Pen,
  NotepadText,
  Hospital,
  Building2,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ApiConstants from "../constants/apiConstants";

const DashboardHospital = () => {
  const [hospital, setHospital] = useState({});
  const [loading, setLoading] = useState(true);

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
        setHospital(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex justify-center items-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
          <svg className="animate-spin w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Loading Hospital Data...</h2>
        <p className="text-gray-600">Please wait while we fetch your hospital information</p>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Hospital className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-900">Hospital Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hospital Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-full mb-6 shadow-lg">
                <Hospital className="w-16 h-16 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-6 text-center">
                {hospital.name || "Hospital Name"}
              </h2>
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-500 font-medium">Address</p>
                    <p className="text-emerald-800">
                      {hospital.address || "Hospital Address"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-500 font-medium">Contact</p>
                    <p className="text-emerald-800">
                      {hospital.mobileNumber || "Hospital Contact"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-4">
            <Link
              to="/appointments"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 shadow-md">
                <CalendarCheck2 className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-800 transition-colors">
                  View Appointments
                </h3>
                <p className="text-emerald-600 text-sm">
                  Manage patient appointments
                </p>
              </div>
            </Link>

            <Link
              to="/find-patients"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 shadow-md">
                <Search className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-800 transition-colors">
                  Find Patients
                </h3>
                <p className="text-emerald-600 text-sm">
                  Search and manage patient records
                </p>
              </div>
            </Link>

            <Link
              to="/manage-doctors"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 shadow-md">
                <Pen className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-800 transition-colors">
                  Manage Doctors
                </h3>
                <p className="text-emerald-600 text-sm">
                  Add or update doctor information
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-emerald-900">--</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <NotepadText className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Active Doctors</p>
                <p className="text-2xl font-bold text-emerald-900">--</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Today's Appointments</p>
                <p className="text-2xl font-bold text-emerald-900">--</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <CalendarCheck2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHospital;