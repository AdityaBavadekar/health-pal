import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ApiConstants from "../constants/ApiConstants";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const PatientInfo = () => {
    const [patient, setPatient] = useState({});
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const patientId = useParams().id;
    if (!patientId) {
        useNavigate().navigate('/dashboard');
    }
    const token = Cookies.get('jwt');
    const user = jwtDecode(token);

    if (user.type != 'Hospital') {
        useNavigate().navigate('/dashboard');
    }

    function generateSummary() {
        setLoading(true);
        fetch(ApiConstants.API_SUMMARY_PATIENT + '/' + patientId, {
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
                setSummary(data.message);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetch(ApiConstants.API_PATIENT_BY_ID + '/' + patientId, {
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
                setPatient(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="px-5 py-3">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">Patient Information</h1>
            <div className="flex items-center justify-center">
                {
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md gap-4 items-center justify-center h-full">
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                Name: {patient.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {patient.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                Contact: {patient.mobileNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                Gender: {patient.gender}
                            </p>
                            <p className="text-sm text-gray-600">
                                Blood Group: {patient.bloodSign}
                            </p>
                        </div>
                        <button className={`text-white p-3 rounded mt-5 ${summary == '' ? 'bg-blue-500' : 'bg-gray-400'}`} onClick={generateSummary} disabled={summary != ''}>
                            <p className="text-sm">
                                { summary == '' ? "Generate summary" : "Summary generated" }
                            </p>
                        </button>
                        <div className="mt-5">
                            {
                                loading ? <div className="ms-5 pd-2">
                                    <span className="loader animate-spin border-t-2 border-emerald-600 rounded-full h-6 w-6 inline-block"></span> </div> : <></>
                            }
                            {summary == '' ? <></> :
                                <div className="bg-gray-200 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600 font-bold mb-3">
                                        AI Summary: 
                                    </p>
                                    <p className="text-sm">
                                        <ReactMarkdown className="text-gray-600">
                                            {summary}
                                        </ReactMarkdown>
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PatientInfo;