import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  vin: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  cost: { type: Number },
  priority: { type: String },
  date: { type: String },
  type: { type: String },
});

const Event = mongoose.models.Events || mongoose.model("Events", eventSchema);

export default Event;
