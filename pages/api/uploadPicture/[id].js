import formidable from "formidable";
import cloudinary from "cloudinary";
import UserCar from "@/db/models/UserCar";
import { getToken } from "next-auth/jwt";

//copied function (parseAsync) from cloudinary workshop
function parseAsync(request) {
  // create a Promise which resolves with the parsed files
  return new Promise((resolve, reject) => {
    // instantiate formidable
    const form = formidable({});

    // parse form request with callback
    form.parse(request, (error, fields, files) => {
      if (error) {
        console.log(error);
        // reject Promise if something went wrong
        reject(error);
        return;
      }
      // resolve Promise if files were parsed correctly
      resolve({ fields, files });
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default async function handler(request, response) {
  const { id } = request.query;
  const token = await getToken({ req: request });

  if (token) {
    switch (request.method) {
      case "POST":
        const files = await parseAsync(request);
        const { imageFile } = files.files;

        const result = await cloudinary.v2.uploader.upload(imageFile.filepath, {
          public_id: imageFile.newFilename,
        });
        const updatedCar = await UserCar.findOneAndUpdate(
          { UserId: id },
          { ImageUrl: result.url }
        );
        if (!updatedCar) {
          return response.status(404).json({ status: "Not Found" });
        }
        response.status(201).json(updatedCar);
        break;

      default:
        response.status(400).json({ message: "Method not implemented" });
    }
  }
}
