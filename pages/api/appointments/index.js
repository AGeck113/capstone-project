import dbConnect from "../../../db/connect";
import Appointment from "../../../db/models/Appointment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const events = await Appointment.find();

    if (!events) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(events);
  }

  if (request.method === "POST") {
    try {
      const eventData = request.body;
      const newEvent = new Appointment(eventData);
      await newEvent.save();
      return response.status(201).json({ status: "event saved" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
