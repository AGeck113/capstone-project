import Appointment from "@/db/models/Appointment";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "PATCH") {
    const updatedAppointment = await Appointment.updateOne(
      { "documents._id": request.body },
      { $pull: { documents: { _id: request.body } } }
    );
    if (!updatedAppointment) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(updatedAppointment);
  }
}
