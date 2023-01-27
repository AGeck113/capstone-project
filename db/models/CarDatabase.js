import mongoose from "mongoose";
const { Schema } = mongoose;

const carSchema = new Schema({
  VIN: { type: String, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Milage: { type: Number },
  Plate: { type: String },
  ImageUrl: { type: String },
  "Length (mm)": { type: Number },
  "Height (mm)": { type: Number },
  "Width (mm)": { type: Number },
  "Width including mirrors (mm)": { type: Number },
  "Height (mm)": { type: Number },
  "Weight Empty (kg)": { type: Number },
  "Max Weight (kg)": { type: Number },
  Drive: { type: String },
  "Model Year": { type: Number },
  "Engine Displacement (ccm)": { type: Number },
  Transmission: { type: String },
  "Number Of Gears": { type: Number },
});

const CarDatabase =
  mongoose.models.CarDatabase || mongoose.model("CarDatabase", carSchema);

export default CarDatabase;
