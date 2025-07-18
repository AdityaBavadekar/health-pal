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
  Car as ParkingIcon
} from 'lucide-react';
import Cookies from "js-cookie";
import ApiConstants from "../constants/apiConstants";

const SettingsHospital = () => {
  const [hospitalData, setHospitalData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    emergencyPhone: "",
    establishedYear: "",
    licenseNumber: "",
    capacity: "",
    departments: "",
    doctors: "",
    nurses: "",
    operatingHours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: ""
    },
    specializations: [],
    facilities: [],
    certifications: []
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch hospital data on component mount
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await fetch(ApiConstants.API_ME, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hospital data');
        }

        const data = await response.json();
        
        // Map API response to our state structure
        setHospitalData(prevData => ({
          ...prevData,
          name: data.name || "",
          description: data.description || "",
          address: data.address || "",
          phone: data.mobileNumber || data.phone || "",
          email: data.email || "",
          website: data.website || "",
          emergencyPhone: data.emergencyPhone || "",
          establishedYear: data.establishedYear || "",
          licenseNumber: data.licenseNumber || "",
          capacity: data.capacity || "",
          departments: data.departments || "",
          doctors: data.doctors || "",
          nurses: data.nurses || "",
          operatingHours: data.operatingHours || prevData.operatingHours,
          specializations: data.specializations || [],
          facilities: data.facilities || [],
          certifications: data.certifications || []
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  const handleInputChange = (field, value) => {
    setHospitalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = Cookies.get("jwt");
      const response = await fetch(ApiConstants.API_UPDATE_HOSPITAL || `${ApiConstants.API_BASE}/hospital/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(hospitalData),
      });

      if (!response.ok) {
        throw new Error('Failed to update hospital data');
      }

      const updatedData = await response.json();
      console.log('Hospital data updated successfully:', updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating hospital data:", error);
      // You might want to show an error message to the user here
    } finally {
      setSaving(false);
    }
  };

  // Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
          <svg className="animate-spin w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Loading Hospital Settings...</h2>
        <p className="text-gray-600">Please wait while we fetch your hospital information</p>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-emerald-500 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const InfoCard = ({ icon: Icon, label, value, editable = false, field }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          {editable && isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : (
            <p className="text-sm text-gray-900 font-medium">{value || "Not provided"}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Settings</h1>
              <p className="text-gray-600">Manage your hospital information and configuration</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={saving}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isEditing 
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
                  className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ${
                    saving ? 'opacity-50 cursor-not-allowed' : ''
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
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton
            id="general"
            label="General Info"
            icon={Building2}
            isActive={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
          />
          <TabButton
            id="contact"
            label="Contact Details"
            icon={Phone}
            isActive={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
          />
          <TabButton
            id="operations"
            label="Operations"
            icon={Clock}
            isActive={activeTab === 'operations'}
            onClick={() => setActiveTab('operations')}
          />
          <TabButton
            id="facilities"
            label="Facilities"
            icon={Bed}
            isActive={activeTab === 'facilities'}
            onClick={() => setActiveTab('facilities')}
          />
          <TabButton
            id="certifications"
            label="Certifications"
            icon={Award}
            isActive={activeTab === 'certifications'}
            onClick={() => setActiveTab('certifications')}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {activeTab === 'general' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">General Information</h2>
              
              {/* Hospital Image */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Camera className="w-4 h-4" />
                        Take Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={Building2} 
                  label="Hospital Name" 
                  value={hospitalData.name}
                  editable={true}
                  field="name"
                />
                <InfoCard 
                  icon={FileText} 
                  label="License Number" 
                  value={hospitalData.licenseNumber}
                  editable={true}
                  field="licenseNumber"
                />
                <InfoCard 
                  icon={Star} 
                  label="Established Year" 
                  value={hospitalData.establishedYear}
                  editable={true}
                  field="establishedYear"
                />
                <InfoCard 
                  icon={Bed} 
                  label="Total Capacity" 
                  value={hospitalData.capacity ? `${hospitalData.capacity} beds` : ""}
                  editable={true}
                  field="capacity"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    value={hospitalData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter hospital description..."
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
                    {hospitalData.description || "No description provided"}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={MapPin} 
                  label="Address" 
                  value={hospitalData.address}
                  editable={true}
                  field="address"
                />
                <InfoCard 
                  icon={Phone} 
                  label="Main Phone" 
                  value={hospitalData.phone}
                  editable={true}
                  field="phone"
                />
                <InfoCard 
                  icon={Phone} 
                  label="Emergency Phone" 
                  value={hospitalData.emergencyPhone}
                  editable={true}
                  field="emergencyPhone"
                />
                <InfoCard 
                  icon={Mail} 
                  label="Email Address" 
                  value={hospitalData.email}
                  editable={true}
                  field="email"
                />
                <InfoCard 
                  icon={Globe} 
                  label="Website" 
                  value={hospitalData.website}
                  editable={true}
                  field="website"
                />
              </div>
            </div>
          )}

          {activeTab === 'operations' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Operations & Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard 
                  icon={Building2} 
                  label="Departments" 
                  value={hospitalData.departments}
                  editable={true}
                  field="departments"
                />
                <InfoCard 
                  icon={Stethoscope} 
                  label="Doctors" 
                  value={hospitalData.doctors}
                  editable={true}
                  field="doctors"
                />
                <InfoCard 
                  icon={Users} 
                  label="Nurses" 
                  value={hospitalData.nurses}
                  editable={true}
                  field="nurses"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {hospitalData.specializations.length > 0 ? (
                    hospitalData.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {spec}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No specializations added yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">
                      {hospitalData.operatingHours.monday || "Operating hours not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Facilities & Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitalData.facilities.length > 0 ? (
                  hospitalData.facilities.map((facility, index) => {
                    const getIcon = (facilityName) => {
                      switch(facilityName.toLowerCase()) {
                        case 'free wifi': return Wifi;
                        case 'parking available': return ParkingIcon;
                        case 'wheelchair accessible': return Accessibility;
                        case 'cafeteria': return Coffee;
                        default: return Building2;
                      }
                    };
                    
                    const Icon = getIcon(facility);
                    
                    return (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Icon className="w-5 h-5 text-emerald-600" />
                        <span className="text-gray-700 font-medium">{facility}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No facilities information available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Certifications & Accreditations</h2>
              
              <div className="space-y-4">
                {hospitalData.certifications.length > 0 ? (
                  hospitalData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                      <div className="p-2 bg-emerald-500 rounded-full">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cert}</p>
                        <p className="text-sm text-gray-500">Valid & Active</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No certifications information available</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsHospital;