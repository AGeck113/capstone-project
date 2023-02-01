import dbConnect from "../../../db/connect";
import Event from "../../../db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { vin } = request.query;
  if (request.method === "GET") {
    const events = await Event.find({ vin: vin });

    if (!events) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(events);
  }
}
