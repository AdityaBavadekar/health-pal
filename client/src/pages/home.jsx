import React from 'react';

const Home = () => {
  return (
    <div className="w-full">

      <section 
        className="h-screen bg-[url('./img_srcs/home.jpeg')] bg-cover bg-center bg-fixed flex items-center justify-center">
<div className="text-center text-white p-8 max-w-2xl">
  <h1 className="text-6xl font-bold mb-6">Health Pal</h1>
  <p className="text-xl mb-8">Your Health, Our Priority</p>
  <div className="flex justify-center gap-8">
    <button className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 w-40"> {/* Added w-40 for fixed width */}
      Sign Up
    </button>
    <button className="bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-emerald-500 transition duration-300 w-40"> {/* Added w-40 for fixed width */}
      Log In
    </button>
  </div>
</div>
      </section>

      <section className="py-48 px-8 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-emerald-900">About us</h2>
          <p className="text-xl text-emerald-700 leading-relaxed">
          Welcome to HealthPal, a healthcare platform designed to connects patients, doctors, and hospitals easily, making healthcare accessible and efficient. Our goal is to provide people with resources necessary to manage their health and to offer healthcare providers efficient tools for better care.</p>
          <p className="text-xl text-emerald-700 leading-relaxed">
          In today’s fast-paced world, maintaining good health can be difficult. For this reason, we developed HealthPal to simplify, increase accessibility, and personalize healthcare management. Our platform combines modern technologies, such as picture text recognition and generative AI, to create an easy interface for patients and healthcare professionals. 
          </p>
        </div>
      </section>

      <section 
        className="py-40 bg-fixed bg-cover bg-center relative bg-[url('https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2072')]"
      >
        <div className="absolute inset-0 bg-emerald-900 bg-opacity-70"></div>
        <div className="relative max-w-6xl mx-auto px-8">
  <div className="flex justify-center">
    <div className="max-w-3xl text-white text-center">
      <h3 className="text-5xl font-bold mb-4 py-8">For Patients</h3>
      <p className="text-emerald-100 text-lg leading-relaxed mb-8">
        HealthPal helps patients by making managing their health much easier. Often, patients forget to take their medicine or miss appointments, which can harm their health. By having automatic reminders for medications and appointment scheduling, patients can stay on track with their treatment. It also helps them feel more in control of their health, as they can easily access their medical history and get answers to their health-related questions without waiting for a doctor's visit. Additionally, finding and buying medicine becomes less of a hassle, as they can order it directly or find nearby pharmacies. This platform saves patients time, reduces stress, and ensures they follow their health plan more effectively.
      </p>
      <button className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 inline-flex items-center justify-center mx-auto">
        <span>Sign up as Patient</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</div>
      </section>

      <section className="py-48 px-8 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-emerald-900">For Doctor</h2>
          <p className="text-xl text-emerald-700 leading-relaxed py-4">
          HealthPal saves valuable time and reduces the complexity of managing patients. Doctors often have to spend a lot of time reviewing patient histories and organizing appointments. Doctors can make faster and more accurate decisions with quick access to patient records and AI-generated summaries. The platform allows them to easily communicate with patients, answering questions or giving advice without needing extra appointments. This helps doctors focus more on providing care rather than handling paperwork, improving their efficiency. Overall, the platform simplifies their daily tasks, allowing them to offer better care while reducing their workload.</p>
          <button className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 inline-flex items-center justify-center mx-auto">
        <span>Sign up as Doctor</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
        </div>
      </section>
      
      <section 
        className="py-48 bg-fixed bg-cover bg-center relative bg-[url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070')]">
        <div className="absolute inset-0 bg-emerald-900 bg-opacity-60"></div>
        <div className="relative max-w-4xl mx-auto text-center px-8">
          <h2 className="text-5xl font-bold text-white mb-8">Our Vision</h2>
          <p className="text-xl text-emerald-100 mb-12">
          At HealthPal, we aim to bridge the gap between patients and doctors by providing a smart, user-friendly healthcare platform. We believe in making healthcare more efficient and accessible for everyone. Our platform improves patient health, and enhances the doctor-patient relationship, creating a healthier future for all.
          Join us in transforming the healthcare journey by making it easier and safer. </p>
        </div>
      </section>

      <footer className="bg-emerald-900 text-white py-20 px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-3 gap-12">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Health Pal</h2>
        <p className="text-emerald-100">
          Your trusted companion for healthcare management.
        </p>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
        <div className="space-y-2 text-emerald-100">
          <p className="flex items-center justify-center md:justify-start">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
              healthpal1427@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +91 9356616091
          </p>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
        <div className="flex space-x-4 justify-center md:justify-start">
          <a href="#" className="text-emerald-100 hover:text-white transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-emerald-100 hover:text-white transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>

          <a href="#" className="text-emerald-100 hover:text-white transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-emerald-800 mt-12 pt-8 text-center">
      <p className="text-emerald-100">
        © 2024 Health Pal. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;