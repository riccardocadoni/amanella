// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data: any = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject({ err });
        }
        resolve({ files });
      });
    });

    console.log("data", data.files.file.originalFilename);

    // invia una risposta di conferma
    res.status(200).json({
      message:
        "Immagine ricevuta correttamente: " + data.files.file.originalFilename,
    });
  } else {
    // invia un errore se il metodo della richiesta non è POST
    res
      .status(405)
      .json({ message: "Il metodo della richiesta non è consentito." });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
