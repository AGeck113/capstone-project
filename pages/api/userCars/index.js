import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  if (token) {
    if (request.method === "POST") {
      try {
        const carData = request.body;
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
