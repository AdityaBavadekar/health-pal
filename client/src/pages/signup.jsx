
import React, { useState } from "react";
import { User, Stethoscope, Building2, UserCheck, Heart, Activity, Cross } from "lucide-react";
import SignupComponent from "../components/signupCom";

const SignUp = () => {
  const [signupType, setSignupType] = useState("patient");

  const userTypes = [
    { key: "doctor", label: "Doctor", icon: Stethoscope },
    { key: "patient", label: "Patient", icon: User },
    { key: "hospital", label: "Hospital", icon: Building2 }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-100 p-4 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full opacity-40 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-cyan-200 to-emerald-200 rounded-full opacity-30 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full opacity-35 blur-lg animate-pulse delay-500"></div>

        {/* Medical-themed floating elements */}
        <div className="absolute top-32 right-1/4 opacity-20 animate-float">
          <Heart className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="absolute bottom-32 left-1/4 opacity-15 animate-float-delayed">
          <Activity className="w-10 h-10 text-teal-400" />
        </div>
        <div className="absolute top-1/3 right-20 opacity-25 animate-float-slow">
          <Cross className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-20 animate-float-delayed">
          <Stethoscope className="w-7 h-7 text-emerald-400" />
        </div>

        {/* Geometric patterns */}
        <div className="absolute top-10 left-1/2 w-24 h-24 border-2 border-emerald-200 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 border-2 border-teal-200 rounded-lg opacity-25 animate-spin-reverse"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 mt-8 w-full max-w-2xl border border-white/30 transform transition-all duration-500 hover:shadow-3xl hover:bg-white/98">
        {/* Header with enhanced icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4 shadow-lg relative">
            <UserCheck className="w-10 h-10 text-emerald-600" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Sign Up
          </h1>
          <p className="text-gray-600 text-lg">Choose your account type to get started</p>
        </div>

        {/* Enhanced button selection */}
        <div className="mb-8">
          <div className="flex bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl p-2 mb-8 shadow-inner border border-emerald-100/50">
            {userTypes.map(({ key, label, icon: Icon }) => (
              <button
                type="button"
                key={key}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 transform ${signupType === key
                  ? "bg-white text-emerald-600 shadow-lg scale-[1.02] font-bold border-2 border-emerald-100"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-white/50 hover:scale-[1.01]"
                  }`}
                onClick={() => setSignupType(key)}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${signupType === key ? "animate-pulse" : ""
                  }`} />
                <span className="text-xl font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <SignupComponent userType={signupType} />

        <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
      </div>
    </div>
  );
};

export default SignUp;