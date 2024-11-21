import MedicineSession from "../models/MedicineSession.js";

function getMedicineSessionById(req, res) {
    const { id } = req.params;
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