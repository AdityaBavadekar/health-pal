import { Search, CalendarCheck2, Pen, NotepadText, Hospital } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ApiConstants from '../constants/ApiConstants';

const DashboardHospital = () => {
    const [hospital, setHospital] = useState({});

    useEffect(() => {
        const token = Cookies.get('jwt');
        fetch(ApiConstants.API_ME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => {
            setHospital(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [])
    
    return (
        <div className="p-2">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 py-5">Hospital Dashboard</h1>

            <div className="grid grid-cols-2 content-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 mx-6 gap-4 flex flex-col items-center justify-center h-full">
                    <Hospital height={'62px'} width={'auto'} className='text-gray-700'/>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            {
                                hospital.name ? hospital.name : 'Hospital Name'
                            }
                        </h2>
                        <p className="text-sm text-gray-600">
                            {
                                hospital.address ? hospital.address : 'Hospital Address'
                            }
                        </p>
                        <p className="text-sm text-gray-600">Contact: 
                            {
                                hospital.mobileNumber ? ` ${hospital.mobileNumber}` : ' Hospital Contact'
                            }
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 px-6">
                    <Link to="/appointments" className="container bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg text-gray-700 transition-shadow flex gap-3 items-center">
                        <CalendarCheck2 />
                        <p className="text-lg font-semibold">View Appointments</p>
                    </Link>
                    <Link to="/find-patients" className="container bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg text-gray-700 transition-shadow flex gap-3 items-center">
                        <Search />
                        <p className="text-lg font-semibold">Find Patients</p>
                    </Link>
                    <Link to="/patient-summary" className="container bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg text-gray-700 transition-shadow flex gap-3 items-center">
                        <NotepadText />
                        <p className="text-lg font-semibold">View Patient Summary</p>
                    </Link>
                    <Link to="/hospital-doctors" className="container bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg text-gray-700 transition-shadow flex gap-3 items-center">
                        <Pen />
                        <p className="text-lg font-semibold">Add or Update Doctors</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardHospital;