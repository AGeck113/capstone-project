import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  vin: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  cost: { type: Number },
  priority: { type: String },
  date: { type: String },
  type: { type: String },
  documents: { type: [String], default: undefined },
  notes: { type: String },
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
