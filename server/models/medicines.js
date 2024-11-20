import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
    default: 1,
  },
  consumptionTime: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});
