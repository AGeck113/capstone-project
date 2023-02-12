import dbConnect from "../../../db/connect";
import CarDatabase from "../../../db/models/CarDatabase";
import { getToken } from "next-auth/jwt";
export default async function handler(request, response) {
  await dbConnect();
  const { vin } = request.query;
  const token = await getToken({ req: request });

  if (token) {
    if (request.method === "GET") {
      const carData = await CarDatabase.findOne({ VIN: vin });
      if (!carData) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(carData);
    }
  }
  {
    return response.status(403).json({ status: "Forbidden" });
  }
}
