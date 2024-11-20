import React, { useState } from "react";
import SignupDoctor from "../components/signupDoctor";
import SignupPatient from "../components/signUpPatient";
import SignupHospital from "../components/signUpHospi";

const SignUp = () => {
  const [signupType, setSignupType] = useState("patient");

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-[40%]">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">SignUp As</h1>
        <div className="buttons flex gap-5 py-2 mb-6 text-xl border-b-2 border-emerald-600 transition-all duration-150">
          <button
            className={`btn ${
              signupType === "doctor" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setSignupType("doctor")}
          >
            Doctor
          </button>
          <button
            className={`btn ${
              signupType === "patient" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setSignupType("patient")}
          >
            Patient
          </button>
          <button
            className={`btn ${
              signupType === "hospital" ? "text-emerald-600 font-bold" : ""
            }`}
            onClick={() => setSignupType("hospital")}
          >
            Hospital
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          {signupType === "doctor" && <SignupDoctor />}
          {signupType === "patient" && <SignupPatient />}
          {signupType === "hospital" && <SignupHospital />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
