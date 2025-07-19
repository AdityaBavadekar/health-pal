import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Stethoscope,
  Bed,
  Car,
  Shield,
  Save,
  Upload,
  Camera,
  Edit3,
  Globe,
  FileText,
  Star,
  Award,
  Wifi,
  Coffee,
  Accessibility,
  Car as ParkingIcon,
  User,
  Calendar,
  Weight,
  Heart,
  AlertTriangle,
  Activity,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import Cookies from "js-cookie";
import ApiConstants from "../constants/apiConstants";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UniversalSettings = () => {
  const [userData, setUserData] = useState({});
  const [userType, setUserType] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = Cookies.get("jwt");

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.type);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!userType || !token) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(ApiConstants.API_ME, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        let transformedData = { ...data };

        if (userType === 'Patient') {
          transformedData = {
            ...data,
            diseases: data.diseases?.map(disease => ({ name: disease })) || [],
            operations: data.operations?.map(operation => ({ name: operation })) || [],
            alergies: data.alergies?.map(allergy => ({ name: allergy })) || [],
            allergies: data.alergies?.map(allergy => ({ name: allergy })) || []
          };
        }

        setUserData(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userType, token]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => i === index ? { ...item, name: value } : item) || []
    }));
  };

  const addArrayItem = (field) => {
    setUserData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), { name: '' }]
    }));
  };

  const removeArrayItem = (field, index) => {
    setUserData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let updateData = { ...userData };

      if (userType === 'Patient') {
        updateData = {
          ...userData,
          diseases: userData.diseases?.map(disease => disease.name).filter(name => name.trim()) || [],
          operations: userData.operations?.map(operation => operation.name).filter(name => name.trim()) || [],
          alergies: userData.allergies?.map(allergy => allergy.name).filter(name => name.trim()) || []
        };

        delete updateData.allergies;
      }

      let apiEndpoint;
      let method = 'PUT';

      switch (userType) {
        case 'Hospital':
          apiEndpoint = `${ApiConstants.API_BASE || 'https://health-pal-api.onrender.com/api'}/hospitals/update`;
          break;
        case 'Doctor':
          apiEndpoint = `${ApiConstants.API_BASE || 'https://health-pal-api.onrender.com/api'}/doctors/update`;
          break;
        case 'Patient':
          apiEndpoint = `${ApiConstants.API_BASE || 'https://health-pal-api.onrender.com/api'}/patients/${userData._id}`;
          break;
        default:
          throw new Error('Invalid user type');
      }

      const response = await fetch(apiEndpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user data');
      }

      const updatedData = await response.json();
      console.log('User data updated successfully:', updatedData);

      setIsEditing(false);
      if (updatedData) {
        setUserData(updatedData);
      }

    } catch (error) {
      console.error("Error updating user data:", error);
      setError(`Failed to save changes: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const getTabsForUserType = () => {
    const commonTabs = [
      { id: 'general', label: 'General Info', icon: User },
      { id: 'contact', label: 'Contact', icon: Phone }
    ];

    switch (userType) {
      case 'Hospital':
        return [
          ...commonTabs,
          { id: 'operations', label: 'Operations', icon: Clock },
          { id: 'facilities', label: 'Facilities', icon: Bed }
        ];
      case 'Doctor':
        return [
          ...commonTabs,
          { id: 'professional', label: 'Professional', icon: GraduationCap }
        ];
      case 'Patient':
        return [
          ...commonTabs,
          { id: 'medical', label: 'Medical Info', icon: Heart },
          { id: 'emergency', label: 'Emergency', icon: AlertTriangle }
        ];
      default:
        return commonTabs;
    }
  };

  // Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Settings</h2>
        <p className="text-gray-600">Please wait while we load your information...</p>
      </div>
    </div>
  );

  // Error Component
  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
        ? 'bg-emerald-500 text-white shadow-lg'
        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const InfoCard = ({ icon: Icon, label, value, editable = false, field, type = "text" }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          {editable && isEditing ? (
            <input
              type={type}
              value={value || ''}
              onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : (
            <p className="text-sm text-gray-900 font-medium">
              {value || "Not provided"}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ArrayField = ({ label, items = [], field, icon: Icon }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-600" />
          {label}
        </h3>
        {isEditing && (
          <button
            onClick={() => addArrayItem(field)}
            className="px-3 py-1 bg-emerald-500 text-white rounded-md text-sm hover:bg-emerald-600 transition-colors"
          >
            Add {label.slice(0, -1)}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={item?.name || ''}
                    onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={`Enter ${label.slice(0, -1).toLowerCase()}`}
                  />
                  <button
                    onClick={() => removeArrayItem(field, index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <span className="text-gray-700">{item?.name || item}</span>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No {label.toLowerCase()} added yet</p>
        )}
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">General Information</h2>

      {/* Profile Image */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
            {userType === 'Hospital' && <Building2 className="w-12 h-12 text-white" />}
            {userType === 'Doctor' && <Stethoscope className="w-12 h-12 text-white" />}
            {userType === 'Patient' && <User className="w-12 h-12 text-white" />}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={User}
          label="Name"
          value={userData.name}
          editable={true}
          field="name"
        />
        <InfoCard
          icon={Mail}
          label="Email"
          value={userData.email}
          editable={true}
          field="email"
          type="email"
        />

        {(userType === 'Doctor' || userType === 'Patient') && (
          <>
            <InfoCard
              icon={Calendar}
              label="Date of Birth"
              value={userData.dob ? userData.dob.split('T')[0] : ''}
              editable={true}
              field="dob"
              type="date"
            />
            <InfoCard
              icon={User}
              label="Gender"
              value={userData.gender}
              editable={true}
              field="gender"
            />
          </>
        )}

        {userType === 'Hospital' && (
          <InfoCard
            icon={FileText}
            label="License Number"
            value={userData.licenseData}
            editable={true}
            field="licenseData"
          />
        )}

        {userType === 'Doctor' && (
          <>
            <InfoCard
              icon={FileText}
              label="License Number"
              value={userData.licenseData}
              editable={true}
              field="licenseData"
            />
            <InfoCard
              icon={Briefcase}
              label="Experience (years)"
              value={userData.experience}
              editable={true}
              field="experience"
              type="number"
            />
          </>
        )}

        {userType === 'Patient' && (
          <>
            <InfoCard
              icon={MapPin}
              label="Country"
              value={userData.country}
              editable={true}
              field="country"
            />
            <InfoCard
              icon={MapPin}
              label="Province/State"
              value={userData.provience}
              editable={true}
              field="provience"
            />
            <InfoCard
              icon={MapPin}
              label="City"
              value={userData.city}
              editable={true}
              field="city"
            />
            <InfoCard
              icon={Weight}
              label="Weight (kg)"
              value={userData.weight}
              editable={true}
              field="weight"
              type="number"
            />
          </>
        )}
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={MapPin}
          label="Address"
          value={userData.address}
          editable={true}
          field="address"
        />
        <InfoCard
          icon={Phone}
          label="Mobile Number"
          value={userData.mobileNumber}
          editable={true}
          field="mobileNumber"
          type="tel"
        />
      </div>
    </div>
  );

  const renderProfessionalTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={GraduationCap}
          label="Degree"
          value={userData.degree}
          editable={true}
          field="degree"
        />
        <InfoCard
          icon={Stethoscope}
          label="Specialization"
          value={userData.specialization}
          editable={true}
          field="specialization"
        />
      </div>
    </div>
  );

  const renderMedicalTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InfoCard
          icon={Heart}
          label="Blood Type"
          value={userData.bloodSign}
          editable={true}
          field="bloodSign"
        />
        <InfoCard
          icon={Stethoscope}
          label="Family Doctor"
          value={userData.familyDoctor}
          editable={true}
          field="familyDoctor"
        />
      </div>

      <ArrayField
        label="Diseases"
        items={userData.diseases}
        field="diseases"
        icon={Activity}
      />

      <ArrayField
        label="Operations"
        items={userData.operations}
        field="operations"
        icon={Shield}
      />

      <ArrayField
        label="Allergies"
        items={userData.allergies}
        field="allergies"
        icon={AlertTriangle}
      />
    </div>
  );

  const renderEmergencyTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Emergency Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={Phone}
          label="Emergency Contact"
          value={userData.emergencyNumber}
          editable={true}
          field="emergencyNumber"
          type="tel"
        />
      </div>
    </div>
  );

  const renderOperationsTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Operations & Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon={Building2}
          label="Departments"
          value={userData.departments}
          editable={true}
          field="departments"
        />
        <InfoCard
          icon={Stethoscope}
          label="Number of Doctors"
          value={userData.doctorIds?.length || 0}
          editable={false}
        />
        <InfoCard
          icon={Users}
          label="License Data"
          value={userData.licenseData}
          editable={true}
          field="licenseData"
        />
      </div>
    </div>
  );

  const renderFacilitiesTab = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Facilities & Services</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600">
          Facilities management will be available in a future update.
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'contact':
        return renderContactTab();
      case 'professional':
        return renderProfessionalTab();
      case 'medical':
        return renderMedicalTab();
      case 'emergency':
        return renderEmergencyTab();
      case 'operations':
        return renderOperationsTab();
      case 'facilities':
        return renderFacilitiesTab();
      default:
        return renderGeneralTab();
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error && !userData.name) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {userType === 'Hospital' && 'Hospital Settings'}
                {userType === 'Doctor' && 'Doctor Settings'}
                {userType === 'Patient' && 'Patient Settings'}
              </h1>
              <p className="text-gray-600">
                Manage your {userType?.toLowerCase()} information and preferences
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={saving}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isEditing
                  ? 'bg-gray-500 text-white hover:bg-gray-600'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>

              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ${saving ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {getTabsForUserType().map(tab => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UniversalSettings;