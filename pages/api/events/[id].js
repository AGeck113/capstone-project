import dbConnect from "../../../db/connect";
import Event from "../../../db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    const updatedAppointment = await Event.findByIdAndUpdate(id, {
      $set: request.body,
    });
    if (!updatedAppointment) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json({ status: "Appointment updated" });
  }
  if (request.method === "DELETE") {
    const appointment = await Event.findByIdAndDelete(id);

    if (!appointment) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(appointment);
  }
}
