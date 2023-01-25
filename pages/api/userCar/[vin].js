import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";

export default async function handler(request, response) {
  await dbConnect();
  const { vin } = request.query;
  if (request.method === "GET") {
    const carData = await UserCar.find({ VIN: vin });

    if (!carData) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(carData);
  }
}
