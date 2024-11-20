import MedicineConsumptions from "../models/MedicineConsumptions";

function getMedicineConsumptionReport(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const patientId = req.user.id;
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    MedicineConsumptions.find({ 
        patientId,
        date: {
            $gt: start,
            $lt: end
        }
    })
        .then(medicineConsumptions => {
            res.json(medicineConsumptions);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function markAsTaken(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const patientId = req.user.id;
    const { medicineIds } = req.body;
    if (!medicineIds) {
        return res.status(400).json({ message: "Incomplete data" });
    }
    // Create or Update a MedicineConsumption
    const date = new Date();
    MedicineConsumptions.findOneAndUpdate({ patientId, date }, { $addToSet: { medicineIds } }, { upsert: true, new: true })
        .then(medicineConsumption => {
            res.json(medicineConsumption);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

export { getMedicineConsumptionReport, markAsTaken };