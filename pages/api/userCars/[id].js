import dbConnect from "../../../db/connect";
import UserCar from "../../../db/models/UserCar";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const token = await getToken({ req: request });
  if (token) {
    //need for edit car?
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
