import React, { useState } from "react";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };

  const addReminder = () => {
    if (editIndex !== null) {
      const updatedReminders = [...reminders];
      updatedReminders[editIndex] = newReminder;
      setReminders(updatedReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, newReminder]);
    }
    setNewReminder({
      medicineName: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });
  };

  const editReminder = (index) => {
    setNewReminder(reminders[index]);
    setEditIndex(index);
  };

  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const markTaken = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
    alert("Reminder marked as taken!");
  };

  const snoozeReminder = (index) => {
    alert("Snooze functionality not implemented yet.");
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Reminders</h1>

      {/* Upcoming Reminders Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Reminders</h2>
        {reminders.length > 0 ? (
          reminders.map((reminder, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md mb-4 bg-card text-card-foreground flex flex-col sm:flex-row justify-between items-start sm:items-center border"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {reminder.medicineName}
                </h3>
                <p className="text-muted-foreground">
                  <strong>Time:</strong> {reminder.startDate}
                </p>
                <p className="text-muted-foreground">
                  <strong>Dosage:</strong> {reminder.dosage}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <button
                  onClick={() => markTaken(index)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Taken
                </button>
                <button
                  onClick={() => snoozeReminder(index)}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Snooze
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No reminders available.</p>
        )}
      </section>

      {/* Manage Reminders Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Reminders</h2>

        {/* Add/Edit Reminder Form */}
        <div className="p-6 rounded-lg shadow-md mb-6 bg-card text-card-foreground border">
          <h3 className="text-xl font-semibold mb-4">Add / Edit Reminder</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={newReminder.medicineName}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 bg-input text-foreground"
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={newReminder.dosage}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 bg-input text-foreground"
            />
            <input
              type="text"
              name="frequency"
              placeholder="Frequency"
              value={newReminder.frequency}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 bg-input text-foreground"
            />
            <input // start date
              type="date"
              name="startDate"
              value={newReminder.startDate}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 bg-input text-foreground"
              placeholder="Start Date"
            />
          </div>
          <button
            onClick={addReminder}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-opacity-80"
          >
            {editIndex !== null ? "Update" : "Add"} Reminder
          </button>
        </div>

        {/* Existing Reminders List */}
        <h3 className="text-xl font-semibold mb-4">Existing Reminders</h3>
        {reminders.length > 0 ? (
          reminders.map((reminder, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md mb-4 bg-card text-card-foreground flex justify-between items-center border"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {reminder.medicineName}
                </h3>
                <p className="text-muted-foreground">{reminder.dosage}</p>
                <p className="text-muted-foreground">{reminder.frequency}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => editReminder(index)}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReminder(index)}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No reminders to manage.</p>
        )}
      </section>
    </div>
  );
};

export default RemindersPage;
