import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ApiConstants from "../constants/apiConstants";

const NoHospitalsFound = () => {
    return (
        <div className="text-center text-gray-600 py-5">
            <h2 className="text-2xl font-semibold mb-3">You have no appointments scheduled</h2>
            <p className="text-sm">Click the button above to add a new appointment</p>
        </div>
    );
};

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("jwt");

    useEffect(() => {
        setLoading(true);
        fetch(ApiConstants.API_MY_APPOINTMENTS, {
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
                setAppointments(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [])

    function addAppointment(){
        setLoading(true);
        fetch(ApiConstants.API_ALL_APPOINTMENTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                hospitalId: "673f3599b133754e8e8eaca0",
                department: "Cardiology",
                appointmentDate: new Date(),
                reason: "Regular Checkup"
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setAppointments([...appointments, data]);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
        });
    }

    return (
        <div className="bg-gray-100 h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">
                My Appointments
            </h1>
            <div className="text-center text-gray-600 py-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addAppointment}>
                    Add New Appointment
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
                    !loading && appointments.length == 0 && <NoHospitalsFound />
                }
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {!loading &&
                        appointments.map((appointment, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-6 rounded-lg shadow-md gap-4 flex items-center justify-between h-full border border-gray-200"
                                >
                                    <div className="">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{new Date(appointment.appointmentDate).toLocaleString()}</h3>
                                        <p className="text-sm text-gray-600">{appointment.reason}</p>
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

export default AppointmentsList;
