import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ApiConstants from "../constants/apiConstants";
import { jwtDecode } from "jwt-decode";

const NoPatientsFound = () => {
  return (
    <div className="text-center text-gray-600 py-5">
      <h2 className="text-2xl font-semibold mb-3">No Patients Found</h2>
      <p className="text-sm">Try adjusting the search query</p>
    </div>
  );
}

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const token = Cookies.get('jwt');
  const user = jwtDecode(token);
  const navigate = useNavigate();

  if (user.type != 'Hospital') {
    navigate('/dashboard');
  }

  function handleSearch() {
    if (searchTerm == '') {
      setPatients([]);
      return;
    }
    fetch(ApiConstants.API_PATIENT_BY_NAME + '/' + searchTerm, {
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
      setPatients(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="px-5 py-3">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">Find Patients</h1>
      <div className="mb-4 flex justify-center items-center gap-3">
        <input
          type="text"
          placeholder="Search by patient name"
          className="border p-2 rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {
          patients.length == 0 ? <NoPatientsFound/> :
          patients.map((patient, index) => {
            return (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md gap-4 flex items-center justify-between h-full">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {patient.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {patient.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {patient.mobileNumber}
                  </p>
                </div>
                <Link to={`/patient/${patient._id}`} className="bg-blue-500 text-white p-2 rounded mt-2">
                  <p className="text-sm">View Patient</p>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PatientsList;
