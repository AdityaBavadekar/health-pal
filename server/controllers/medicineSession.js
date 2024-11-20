import MedicineSession from "../models/medicineSession.js";

function getMedicineSessionById(req, res) {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    MedicineSession.findById(id)
        .then(medicineSession => {
            if (!medicineSession) {
                return res.status(404).json({ message: "MedicineSession not found" });
            }
            res.json(medicineSession);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function getAllMedicineSessions(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const patientId = req.user.id;
    MedicineSession.find({ patientId })
        .then(medicineSessions => {
            res.json(medicineSessions);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addMedicineSession(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const doctorId = req.user.id;
    const { patientId, items } = req.body;
    if (!patientId || !items) {
        return res.status(400).json({ message: "Incomplete data" });
    }
    const medicineSession = new MedicineSession({ patientId, doctorId, items });
    medicineSession.save()
        .then(() => {
            res.json(medicineSession);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

export { getMedicineSessionById, getAllMedicineSessions, addMedicineSession };