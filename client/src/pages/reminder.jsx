import React, { useState } from "react";
import { Plus, Edit3, Trash2, Check, Clock, Pill, Calendar, Zap } from "lucide-react";

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };

  const addReminder = () => {
    if (!newReminder.medicineName || !newReminder.dosage || !newReminder.startDate) return;

    if (editIndex !== null) {
      const updatedReminders = [...reminders];
      updatedReminders[editIndex] = newReminder;
      setReminders(updatedReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
    }
    setNewReminder({
      medicineName: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });
    setIsFormVisible(false);
  };

  const editReminder = (index) => {
    setNewReminder(reminders[index]);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const markTaken = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const snoozeReminder = (index) => {
    // Placeholder for snooze functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">Active Reminders</p>
                <p className="text-3xl font-bold text-emerald-800">{reminders.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">Due Today</p>
                <p className="text-3xl font-bold text-teal-800">{reminders.length}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-600 font-semibold text-sm uppercase tracking-wide">Streak Days</p>
                <p className="text-3xl font-bold text-cyan-800">7</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Reminder Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Add New Reminder
          </button>
        </div>

        {/* Add/Edit Form */}
        {isFormVisible && (
          <div className="mb-12 animate-in slide-in-from-top duration-500">
            <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-emerald-600" />
                </div>
                {editIndex !== null ? "Edit Reminder" : "Add New Reminder"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-emerald-700 font-medium text-sm">Medicine Name</label>
                  <input
                    type="text"
                    name="medicineName"
                    placeholder="Enter medicine name"
                    value={newReminder.medicineName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-emerald-100 focus:border-emerald-400 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-700 font-medium text-sm">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    placeholder="e.g., 1 tablet, 5ml"
                    value={newReminder.dosage}
                    onChange={handleInputChange}
                    className="w-full border-2 border-emerald-100 focus:border-emerald-400 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-700 font-medium text-sm">Frequency</label>
                  <input
                    type="text"
                    name="frequency"
                    placeholder="e.g., Twice daily"
                    value={newReminder.frequency}
                    onChange={handleInputChange}
                    className="w-full border-2 border-emerald-100 focus:border-emerald-400 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-700 font-medium text-sm">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newReminder.startDate}
                    onChange={handleInputChange}
                    className="w-full border-2 border-emerald-100 focus:border-emerald-400 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={addReminder}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {editIndex !== null ? "Update" : "Add"} Reminder
                </button>
                <button
                  onClick={() => {
                    setIsFormVisible(false);
                    setEditIndex(null);
                    setNewReminder({
                      medicineName: "",
                      dosage: "",
                      frequency: "",
                      startDate: "",
                      endDate: "",
                    });
                  }}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Reminders */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            Upcoming Reminders
          </h2>

          {reminders.length > 0 ? (
            <div className="grid gap-6">
              {reminders.map((reminder, index) => (
                <div
                  key={reminder.id || index}
                  className="group bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                          <Pill className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-emerald-800">{reminder.medicineName}</h3>
                          <p className="text-emerald-600 text-sm font-medium">{reminder.frequency}</p>
                        </div>
                      </div>
                      <div className="ml-16">
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Dosage:</span> {reminder.dosage}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Start Date:</span> {new Date(reminder.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => markTaken(index)}
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                      >
                        <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => snoozeReminder(index)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                      >
                        <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => editReminder(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                      >
                        <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => deleteReminder(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pill className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">No reminders yet</h3>
              <p className="text-emerald-600 mb-6">Start by adding your first medication reminder</p>
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Add Your First Reminder
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RemindersPage;
