import mongoose from "mongoose";

const { Schema } = mongoose;

const userCarSchema = new Schema({
  VIN: { type: String },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  userId: { type: String, required: true },
  Milage: { type: Number },
  Plate: { type: String },
  ImageUrl: { type: String },
  "Length (mm)": { type: Number },
  "Height (mm)": { type: Number },
  "Width (mm)": { type: Number },
  "Width including mirrors (mm)": { type: Number },
  "Weight Empty (kg)": { type: Number },
  "Max Weight (kg)": { type: Number },
  Drive: { type: String },
  "Model Year": { type: Number },
  "Engine Displacement (ccm)": { type: Number },
  Transmission: { type: String },
  "Number Of Gears": { type: Number },
});

const UserCar =
  mongoose.models.UserCars || mongoose.model("UserCars", userCarSchema);

export default UserCar;
