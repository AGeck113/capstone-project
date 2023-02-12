import Appointment from "@/db/models/Appointment";
import dbConnect from "../../../db/connect";
import { getToken } from "next-auth/jwt";
export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  if (token) {
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
  {
    return response.status(403).json({ status: "Forbidden" });
  }
}
