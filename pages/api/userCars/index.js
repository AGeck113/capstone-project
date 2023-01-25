import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "POST") {
    console.log("request body:", request.body);
    try {
      const carData = request.body;
      const newCar = new UserCar(carData);
      await newCar.save();
      response.status(201).json({ status: "product created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
