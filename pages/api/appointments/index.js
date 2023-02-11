import dbConnect from "../../../db/connect";
import Appointment from "../../../db/models/Appointment";
import { getToken } from "next-auth/jwt";
export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  const userId = token.sub;
  if (token) {
    switch (request.method) {
      case "GET":
        const events = await Appointment.find({ userId: userId });

        if (!events) {
          return response.status(404).json({ status: "Not Found" });
        }

        return response.status(200).json(events);

      case "POST":
        try {
          const eventData = request.body;
          const newEvent = new Appointment({ ...eventData, userId: userId });
          await newEvent.save();
          return response.status(201).json({ status: "event saved" });
        } catch (error) {
          console.error(error);
          return response.status(40).json({ error: error.message });
        }
    }
  }
}
