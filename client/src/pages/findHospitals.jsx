import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiConstants from "../constants/apiConstants";

const NoHospitalsFound = () => {
  return (
    <div className="text-center text-gray-600 py-5">
      <h2 className="text-2xl font-semibold mb-3">No Hospitals Found</h2>
      <p className="text-sm">Try adjusting the search query</p>
    </div>
  );
};

const HospitalsList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [displayHospitals, setDisplayHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token = Cookies.get("jwt");

  useEffect(() => {
    setLoading(true);
    fetch(ApiConstants.API_ALL_HOSPITALS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHospitals(data);
        setDisplayHospitals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [])

  function handleSearch() {
    if (searchTerm == "") {
      setDisplayHospitals(hospitals);
      return;
    }
    setLoading(true);
    const query = searchTerm.toLowerCase();
    const filteredHospitals = hospitals.filter((hospital) => 
      (hospital.name.toLowerCase().includes(query) || hospital.address.toLowerCase().includes(query))
    );
    setDisplayHospitals(filteredHospitals);
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">
        Find Hospitals
      </h1>
      <div className="mb-4 flex justify-center items-center gap-3">
        <input
          type="text"
          placeholder="Search hospitals by name"
          className="border p-2 rounded h-14 "
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
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
          loading && <div className="text-center text-gray-600 py-5">
            <h2 className="text-2xl font-semibold mb-3">Loading...</h2>
            <p className="text-sm">Please wait</p>
          </div>
        }
        {
          !loading && displayHospitals.length == 0 && <NoHospitalsFound />
        }
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {!loading &&
            displayHospitals.map((hospital, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-md gap-4 flex items-center justify-between h-full border border-gray-200"
                >
                  <div className="">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.mobileNumber}</p>
                    <p className="text-sm text-gray-600">{hospital.address}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HospitalsList;
