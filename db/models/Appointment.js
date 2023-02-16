import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  vin: { type: String },
  description: { type: String, required: true },
  title: { type: String, required: true },
  userId: { type: String, required: true },
  cost: { type: Number },
  priority: { type: String },
  date: { type: String },
  type: { type: String },
  documents: [{ title: { type: String }, url: { type: String } }],
  notes: { type: String },
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
