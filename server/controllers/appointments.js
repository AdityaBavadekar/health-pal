import Appoitment from '../models/Appointment.js';

function getAllAppointments(req, res) {
    const hospitalId = req.user.id;
    if (!hospitalId || req.user.type != "Hospital") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    Appoitment.find({ hospitalId })
        .then(appointments => {
            res.json(appointments);
        })
        .catch(err => {
            res.status(500).json(err);
        });       
}

function getAllAppointmentsForPatient(req, res) {
    const patientId = req.user.id;
    if (!patientId || req.user.type != "Patient") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    Appoitment.find({ patientId })
        .then(appointments => {
            res.json(appointments);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getAppointmentById(req, res) {
    const { id } = req.params;
    Appoitment.findById(id)
        .then(appointment => {
            if (!appointment) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            res.json(appointment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function cancelAppointment(req, res) {
    const { id } = req.params;
    Appoitment.findByIdAndDelete(id)
        .then(appointment => {
            if (!appointment) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            res.json(appointment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function addAppointment(req, res) {
    if (req.user.type != "Patient") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { date, startTime, endTime, hospitalId } = req.body;
    if (!date || !startTime || !endTime || !hospitalId) {
        return res.status(400).json({ message: "Please provide all the fields" });
    }
    const patientId = req.user.id;
    const newAppointment = new Appoitment({
        patientId,
        hospitalId,
        date,
        startTime,
        endTime
    });
    newAppointment.save()
        .then(appointment => {
            res.json(appointment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export { getAllAppointments, getAppointmentById, addAppointment, cancelAppointment };