import Patient from "../models/Patient.js";
import PatientReport from "../models/PatientReport.js";

function getAllPatients(req, res) {
    Patient.find()
        .then((patients) => {
            res.json({
                patients: patients.length,
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// function getPatientById(req, res) {
//     const { id } = req.params;
//     Patient.findById(id)
//         .then((patient) => {
//             res.json(patient);
//         })
//         .catch((err) => {
//             res.status(400).json(err);
//         });
// }

const getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id).lean();
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const reports = await PatientReport.find({ patientId: id }).sort({ uploadedAt: -1 }).lean();
        res.status(200).json({
            ...patient,
            reports,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch patient" });
    }
};


const getReportsOfPatient = async (req, res) => {
    if (req.user.id !== req.params.id) {
        if (req.user.type !== "Hospital" && req.user.type !== "Doctor") {
            return res.status(403).json({ message: "Forbidden" });
        }
    }

    const { id } = req.params;
    try {
        const reports = await Report.find({ patientId: id }).sort({ uploadedAt: -1 });
        res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch reports" });
    }
};

function addPatient(req, res) {
    if (req.user.type != "Hospital") {
        return res.status(403).json({ message: "Forbidden" });
    }
    const patient = new Patient(req.body);
    patient
        .save()
        .then((patient) => {
            res.json(patient);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

function updatePatient(req, res) {
    const { id } = req.params;
    Patient.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.json(patient);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

function getPatientsByName(req, res) {
    if (req.user.type != "Hospital") {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { name } = req.params;

    Patient.find({ name: { $regex: new RegExp(name, "i") } }, "-operations -allergies -diseases")
        .then((patients) => {
            res.json(patients);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

export { getPatientById, addPatient, updatePatient, getAllPatients, getPatientsByName, getReportsOfPatient };
