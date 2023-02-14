import formidable from "formidable";
import cloudinary from "cloudinary";
import Appointment from "@/db/models/Appointment";
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
      case "PATCH":
        const files = await parseAsync(request);
        const { documentFile } = files.files;

        const result = await cloudinary.v2.uploader.upload(
          documentFile.filepath,
          {
            public_id: documentFile.newFilename,
          }
        );

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
          $push: { documents: { title: files.fields.title, url: result.url } },
        });

        if (!updatedAppointment) {
          return response.status(404).json({ status: "Not Found" });
        }
        response.status(201).json(updatedAppointment);
        break;

      default:
        return response.status(400).json({ message: "Method not implemented" });
    }
  }
  {
    return response.status(403).json({ status: "Forbidden" });
  }
}
