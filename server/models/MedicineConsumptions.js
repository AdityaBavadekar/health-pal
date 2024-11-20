import mongoose from 'mongoose';

const MedicineConsumption = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    medicineIds: {
        type: [String],
        required: true
    },
});

export default mongoose.model('MedicineConsumption', MedicineConsumption);