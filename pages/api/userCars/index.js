import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  if (token) {
    const userId = token.sub;
    switch (request.method) {
      case "GET":
        const carData = await UserCar.findOne({ userId: userId });

        if (!carData) {
          return response.status(204).json();
        }

        return response.status(200).json(carData);

      case "POST":
        const existing = await UserCar.findOne({ userId: userId });
        if (!existing) {
          try {
            const carData = { ...request.body, userId: userId };
            const newCar = new UserCar(carData);
            await newCar.save();
            return response.status(201).json(newCar);
          } catch (error) {
            console.error(error);
            return response.status(400).json({ error: error.message });
          }
        } else {
          const updatedCar = await UserCar.findOneAndUpdate(
            { userId: userId },
            {
              $set: { ...request.body, userId: userId },
            }
          );
          if (!updatedCar) {
            return response.status(404).json({ status: "Not Found" });
          }
          return response.status(200).json(updatedCar);
        }

      case "PATCH":
        const updatedCar = await UserCar.findOneAndUpdate(
          { userId: userId },
          {
            $set: request.body,
          }
        );
        if (!updatedCar) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(updatedCar);

      case "DELETE":
        const car = await UserCar.findOneAndDelete({ userId: userId });
        if (!car) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json({ status: "car deleted" });
    }
  }
  {
    return response.status(403).json({ status: "Forbidden" });
  }
}
