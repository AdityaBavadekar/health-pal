const API_BASE_URL = "https://health-pal-api.onrender.com/api";

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
  API_ALL_MEDICINE_SESIONS: `${API_BASE_URL}/medicines/sessions`,
  API_ME: `${API_BASE_URL}/me`,
  API_ME_TYPE: `${API_BASE_URL}/me/type`,
  API_PATIENT_BY_NAME: `${API_BASE_URL}/patients/by-name`,
  API_PATIENT_BY_ID: `${API_BASE_URL}/patients`,

  API_SUMMARY_PATIENT: `${API_BASE_URL}/summary/`,
};

export default ApiConstants;