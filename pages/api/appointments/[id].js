import Appointment from "@/db/models/Appointment";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      $set: request.body,
    });
    if (!updatedAppointment) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json({ status: "Appointment updated" });
  }
  if (request.method === "DELETE") {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(appointment);
  }
  if (request.method === "GET") {
    const appointmentData = await Appointment.findById(id);
    if (!appointmentData) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(appointmentData);
  }
}
