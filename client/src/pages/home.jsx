import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-screen bg-[url('assets/img_srcs/home.png')] bg-cover bg-center bg-fixed flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-2xl">
          <h1 className="text-6xl font-bold mb-6 text-black">Health Pal</h1>
          <p className="text-xl mb-8 text-black">Your Health, Our Priority</p>
          <div className="flex justify-center gap-8">
            <button
              onClick={handleSignUp}
              className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 w-40"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-emerald-500 transition duration-300 w-40"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-48 px-8 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-emerald-900">
            About us
          </h2>
          <p className="text-xl text-emerald-700 leading-relaxed">
            Welcome to HealthPal, a healthcare platform designed to connect
            patients, doctors, and hospitals easily, making healthcare
            accessible and efficient.
          </p>
        </div>
      </section>

      {/* For Patients Section */}
      <section className="py-40 bg-fixed bg-cover bg-center relative bg-[url('https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2072')]">
        <div className="absolute inset-0 bg-emerald-900 bg-opacity-70"></div>
        <div className="relative max-w-6xl mx-auto px-8">
          <div className="flex justify-center">
            <div className="max-w-3xl text-white text-center">
              <h3 className="text-5xl font-bold mb-4 py-8">For Patients</h3>
              <p className="text-emerald-100 text-lg leading-relaxed mb-8">
                HealthPal simplifies health management with medication
                reminders, easy appointment scheduling, and stress-free access
                to medical history.
              </p>
              <button
                onClick={handleSignUp}
                className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 inline-flex items-center justify-center mx-auto"
              >
                <span>Sign up as Patient</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Health Pal</h2>
              <p>Your trusted companion for healthcare management.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: healthpal1427@gmail.com</p>
              <p>Phone: +91 9356616091</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
