import dbConnect from "../../../db/connect";
import CarDatabase from "../../../db/models/CarDatabase";

export default async function handler(request, response) {
  await dbConnect();
  const { vin } = request.query;
  if (request.method === "GET") {
    const carData = await CarDatabase.find({ VIN: vin });
    console.log(carData);

    if (!carData) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(carData);
  }
}
