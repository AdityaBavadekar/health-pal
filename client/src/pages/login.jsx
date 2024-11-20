import React, { useState } from "react";
import LoginDoctor from "../components/loginDoctor";
import LoginPatient from "../components/loginPatient";
import LoginHospital from "../components/loginHospital";

const Login = () => {
  const [loginType, setLoginType] = useState("patient");

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-[40%]">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">Login As</h1>
        <div className="buttons flex gap-5 py-2 mb-6 text-xl border-b-2 border-emerald-600 transition-all duration-150">
          <button
            className={`btn ${
              loginType === "doctor" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setLoginType("doctor")}
          >
            Doctor
          </button>
          <button
            className={`btn ${
              loginType === "patient" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setLoginType("patient")}
          >
            Patient
          </button>
          <button
            className={`btn ${
              loginType === "hospital" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setLoginType("hospital")}
          >
            Hospital
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          {loginType === "doctor" && <LoginDoctor />}
          {loginType === "patient" && <LoginPatient />}
          {loginType === "hospital" && <LoginHospital />}
        </div>
      </div>
    </div>
  );
};

export default Login;
