import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ApiConstants from "../constants/apiConstants";
import { jwtDecode } from "jwt-decode";

const NoPatientsFound = () => {
  return (
    <div className="text-center text-gray-600 py-5">
      <h2 className="text-2xl font-semibold mb-3">No Doctors added</h2>
    </div>
  );
}

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const token = Cookies.get('jwt');
  const user = jwtDecode(token);
  const navigate = useNavigate();

  if (user.type != 'Hospital') {
    navigate('/dashboard');
  }

  useEffect(() => {
    fetch(ApiConstants.API_HOSPITAL_DOCTORS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        setDoctors(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  function handleAddDoctor() {
    if (searchTerm == '') {
        return;
    }

    fetch(ApiConstants.API_HOSPITAL_ADD_DOCTOR, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            doctorId: searchTerm
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setDoctors([data, ...doctors]);
        searchTerm('');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div className="px-5 py-3">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">Manage Doctor</h1>
      <div className="mb-4 flex justify-center items-center gap-3">
            <input
            type="text"
            placeholder="Enter doctor Id"
            className="border p-2 rounded w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={handleAddDoctor}
            >
            Add Doctor
            </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {
          doctors.length == 0 ? <NoPatientsFound/> :
          doctors.map((doctor, index) => {
            return (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md gap-4 flex items-center justify-between h-full">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {doctor.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {doctor.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {doctor.mobileNumber}
                  </p>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded mt-2">
                  <p className="text-sm">Delete</p>
                </button>
            </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default ManageDoctors;
