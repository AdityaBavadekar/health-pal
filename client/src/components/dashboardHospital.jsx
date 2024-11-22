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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hospital Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-emerald-100">
            <div className="flex flex-col items-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-6">
                <Hospital className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">
                {hospital.name ? hospital.name : "Hospital Name"}
              </h2>
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <MapPin className="w-5 h-5" />
                  <p className="text-sm">
                    {hospital.address ? hospital.address : "Hospital Address"}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <Phone className="w-5 h-5" />
                  <p className="text-sm">
                    {hospital.mobileNumber
                      ? hospital.mobileNumber
                      : "Hospital Contact"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-4">
            <Link
              to="/appointments"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group"
            >
              <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <CalendarCheck2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900">
                  View Appointments
                </h3>
                <p className="text-emerald-600 text-sm">
                  Manage patient appointments
                </p>
              </div>
            </Link>

            <Link
              to="/find-patients"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group"
            >
              <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Search className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900">
                  Find Patients
                </h3>
                <p className="text-emerald-600 text-sm">
                  Search and manage patient records
                </p>
              </div>
            </Link>

            <Link
              to="/manage-doctors"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group"
            >
              <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Pen className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900">
                  Manage Doctors
                </h3>
                <p className="text-emerald-600 text-sm">
                  Add or update doctor information
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHospital;
