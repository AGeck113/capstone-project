import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  const { id } = request.query;
  if (token) {
    if (request.method === "GET") {
      const carData = await UserCar.findOne({ UserId: id });

      if (!carData) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(carData);
    }
    if (request.method === "PUT") {
      const updatedCar = await UserCar.findOneAndUpdate(
        { UserId: id },
        {
          $set: request.body,
        }
      );
      if (!updatedCar) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(updatedCar);
    }
  }
  return response.status(403).json({ status: "Not logged in!" });
}
