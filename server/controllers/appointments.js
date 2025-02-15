import Appoitment from '../models/Appointment.js';
import Hospital from '../models/Hospital.js';
import Patient from '../models/Patient.js';

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

async function getAllAppointmentsForUser(req, res) {
    if (req.user.type == "Hospital") {
        return getAllAppointmentsForHospital(req, res);
    } else if (req.user.type == "Patient") {
        return getAllAppointmentsForPatient(req, res);
    }
    return res.status(401).json({ message: "Unauthorized" });
}

async function getAllAppointmentsForPatient(req, res) {
    const patientId = req.user.id;
    if (!patientId || req.user.type != "Patient") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const appointments = await Appoitment.find({ patientId });
        
        for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            let hospital = await Hospital.findById(element.hospitalId);
            appointments[index] = {
                ...element._doc,
                'hospital': hospital
            }
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getAllAppointmentsForHospital(req, res) {
    const hospitalId = req.user.id;
    if (req.user.type != "Hospital") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const appointments = await Appoitment.find({ hospitalId });
        
        for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            let patient = await Patient.findById(element.patientId);
            appointments[index] = {
                ...element._doc,
                'patient': {
                    id: patient._id,
                    name: patient.name,
                    email: patient.email
                }
            }
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json(error);
    }
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
    const { hospitalId, department, appointmentDate, reason } = req.body;
    if (!hospitalId || !department || !appointmentDate || !reason) {
        return res.status(400).json({ message: "Please provide all the fields" });
    }
    const patientId = req.user.id;
    const newAppointment = new Appoitment({
        patientId,
        hospitalId,
        department,
        appointmentDate,
        reason
    });
    newAppointment.save()
        .then(appointment => {
            res.json(appointment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export { getAllAppointments, getAllAppointmentsForUser, getAppointmentById, addAppointment, cancelAppointment };