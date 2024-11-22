import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConstants from "../constants/apiConstants";
import { jwtDecode } from "jwt-decode";
import { Activity, MoveUpRight } from "lucide-react";

const NoHealthRecords = () => {
  return (
    <div class="flex items-center justify-center mt-5">
      <div class="bg-white rounded-lg p-6 max-w-sm text-center justify-center items-center flex flex-col gap-5">
        <Activity />
        <div className="text-center">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            No Health Records Added
          </h2>
          <p class="text-gray-500 mb-4">
            Please visit a hospital or consult your doctor to add or update your
            health records.
          </p>
        </div>
      </div>
    </div>
  );
};

const MedicineRecordCard = ({ record }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 max-w-sm text-center flex flex-col gap-5 shadow-lg hover:shadow-xl transform transition-all hover:scale-105">
      <h2 className="text-2xl font-bold text-blue-700">{record.name}</h2>
      <p className="text-gray-600 text-sm">
        <span className="font-medium text-blue-600">{record.frequency}</span>
        {` time${record.frequency > 1 ? "s" : ""} a ${record.frequencyUnit}`}
      </p>
      <div className="bg-blue-600 text-white rounded-md px-3 py-2 font-medium w-fit mx-auto">
        {record.consumptionTime}
      </div>
    </div>
  );
};

const HealthRecords = () => {
  const [healthRecords, setHealthRecords] = useState({});
  const [medicineRecords, setMedicineRecords] = useState([]);
  const token = Cookies.get("jwt");
  const user = jwtDecode(token);
  const navigator = useNavigate();

  if (user.type != "Patient") {
    navigator("/dashboard");
  }

  useEffect(() => {
    // fetch(ApiConstants.API_ME, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //     }
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     setHealthRecords({
    //         "diseases": data.diseases,
    //         "alergies": data.alergies,
    //         "operations": data.operations,
    //     });
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    fetch(ApiConstants.API_ALL_MEDICINE_SESIONS, {
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
        setMedicineRecords(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="px-5 py-3 bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 py-5">
          My Health Records
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Keep track of your medical history, including prescriptions,
          treatments all in one place.
        </p>
      </div>
      <div className="mb-4 flex justify-center items-center gap-3">
        <div>
          {medicineRecords.length === 0 && <NoHealthRecords />}
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 gap-6">
              {medicineRecords.map((record, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 mb-6"
                  >
                    <p className="text-xl text-gray-700 mb-4 font-bold">
                      Prescribed on{" "}
                      {new Date(record.createdAt).toLocaleString()}
                    </p>
                    <ul className="list-number list-inside pl-5 space-y-2">
                      {record.items &&
                        record.items.map((item, index) => (
                          <li
                            key={index}
                            className="flex flex-col gap-3 bg-emerald-50 p-4 rounded-lg shadow-sm"
                          >
                            <p className="text-lg font-semibold text-gray-800 text-emerald-800">
                              {index + 1}. {item.name}
                            </p>
                            <a
                              href={`https://blinkit.com/s/?q=${item.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-emerald-800 hover:text-emerald-900 transition duration-300 gap-2"
                            >
                              <MoveUpRight className="w-5 h-5 text-emerald-500" />
                              <span className="text-sm font-medium">
                                Find on BlinkIt
                              </span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* {
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Diseases
                            </h2>
                            <ul className="list-disc list-inside ms-5">
                                {healthRecords.diseases && healthRecords.diseases.map((disease, index) => (
                                    <li key={index}>{disease.name}</li>
                                ))}
                            </ul>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-5">
                                Alergies
                            </h2>
                            <ul className="list-disc list-inside ms-5">
                                {healthRecords.operations && healthRecords.operations.length === 0 && <li>[No allergies]</li>}
                                {healthRecords.alergies && healthRecords.alergies.map((allergy, index) => (
                                    <li key={index}>{allergy.name}</li>
                                ))}
                            </ul>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-5">
                                Operations
                            </h2>
                            <ul className="list-disc list-inside ms-5">
                                {healthRecords.operations && healthRecords.operations.length === 0 && <li>[No operations]</li>}
                                {healthRecords.operations && healthRecords.operations.map((operation, index) => (
                                    <li key={index}>{operation.name}</li>
                                ))}
                            </ul>
                        </div>
                    } */}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
