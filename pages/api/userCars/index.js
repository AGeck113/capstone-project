import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  const userId = token.sub;
  if (token) {
    switch (request.method) {
      case "GET":
        const carData = await UserCar.findOne({ userId: userId });

        if (!carData || carData.userID != userId) {
          return response.status(404).json({ status: "Not Found" });
        }

        return response.status(200).json(carData);

      case "POST":
        try {
          const carData = { ...request.body, userId };
          const newCar = new UserCar(carData);
          await newCar.save();
          response.status(201).json(newCar);
        } catch (error) {
          console.error(error);
          response.status(400).json({ error: error.message });
        }
    }
  }
}
