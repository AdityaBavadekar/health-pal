// const API_BASE_URL = "https://health-pal-api.onrender.com/api";
const API_BASE_URL = process.env.NODE_ENV === 'production'
? "https://health-pal-backend.vercel.app/api"
: "http://localhost:5000/api";

const ApiConstants = {
  API_LOGIN_DOCTOR: `${API_BASE_URL}/doctors/login`,
  API_LOGIN_PATIENT: `${API_BASE_URL}/patients/login`,
  API_LOGIN_HOSPITAL: `${API_BASE_URL}/hospitals/login`,
  API_REGISTER_DOCTOR: `${API_BASE_URL}/doctors/register`,
  API_REGISTER_PATIENT: `${API_BASE_URL}/patients/register`,
  API_REGISTER_HOSPITAL: `${API_BASE_URL}/hospitals/register`,

  API_ALL_DOCTORS: `${API_BASE_URL}/doctors`,
  API_ALL_HOSPITALS: `${API_BASE_URL}/hospitals`,

  API_ALL_APPOINTMENTS: `${API_BASE_URL}/appointments`,
  API_MY_APPOINTMENTS: `${API_BASE_URL}/appointments/me`,
  API_ALL_MEDICINE_SESIONS: `${API_BASE_URL}/medicines/sessions`,
  API_HOSPITAL_DOCTORS: `${API_BASE_URL}/hospitals/get-doctors`,
  API_ME: `${API_BASE_URL}/me`,
  API_ME_TYPE: `${API_BASE_URL}/me/type`,
  API_PATIENT_BY_NAME: `${API_BASE_URL}/patients/by-name`,
  API_PATIENT_BY_ID: `${API_BASE_URL}/patients`,
  API_HOSPITAL_BY_NAME: `${API_BASE_URL}/hospitals/by-name`,
  API_HOSPITAL_ADD_DOCTOR: `${API_BASE_URL}/hospitals/add-doctor`,

  API_SUMMARY_PATIENT: `${API_BASE_URL}/summary/`,
  API_CHAT_WITH_REPORTS: `${API_BASE_URL}/chat/with-reports/`,
  API_CHAT_FOR_PATIENT: `${API_BASE_URL}/chat/for-patient`,
  API_ALL_REPORTS: `${API_BASE_URL}/reports`,
  API_UPLOAD_REPORT: `${API_BASE_URL}/reports/upload`,
  API_DELETE_REPORT: `${API_BASE_URL}/reports/delete`,
  API_VIEW_REPORT: `${API_BASE_URL}/reports/view`,
};

export default ApiConstants;