import Patient from "../models/Patient.js";

function getAllPatients(req, res) {
    Patient.find()
        .then(patients => {
            res.json({
                "patients": patients.length
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function getPatientById(req, res) {
    const { id } = req.params;
    Patient.findById(id)
        .then(patient => {
            res.json(patient);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addPatient(req, res) {
    if (req.user.type != "Hospital") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const patient = new Patient(req.body);
    patient.save()
        .then(patient => {
            res.json(patient);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function updatePatient(req, res) {
    const { id } = req.params;
    Patient.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    )
    .then(patient => {
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

export { getPatientById, addPatient, updatePatient, getAllPatients };