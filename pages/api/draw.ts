// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type Data = {
  generatedImageURl?: string | null;
  message?: string;
};

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
  res: NextApiResponse<Data>
) {
  const { image } = await req.json();
  /* 
  const fixedimageurl =
    "https://replicate.delivery/pbxt/VSnZBbelytT8J6BAzemrJaNdvlbK7O7OR5myS9daoTxoSlgQA/output_1.png";
  return new Response(
    JSON.stringify({
      generatedImageUrl: fixedimageurl,
    }),
    { status: 200 }
  ); */

  if (req.method === "POST") {
    const prompt = "oil painting, beautifully colored, masterpiece";
    const negativePrompt =
      "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";

    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version:
            "cde353130c86f37d0af4060cd757ab3009cac68eb58df216768f907f0d0a0653",
          input: {
            prompt: prompt,
            n_prompt: negativePrompt,
            input_image: image,
            a_prompt: "best quality, extremely detailed",
            num_samples: "1",
          },
        }),
      }
    );

    let jsonStartResponse = await startResponse.json();
    let endpointUrl = jsonStartResponse?.urls?.get;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let generatedImage: string | null = null;
    while (!generatedImage) {
      // Loop in 1s intervals until the alt text is ready
      console.log("polling for result...");
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        generatedImage = jsonFinalResponse.output[1];
        console.log("SUCCEDED generatedImage: ", generatedImage);
        return new Response(
          JSON.stringify({
            generatedImageUrl: generatedImage,
          }),
          { status: 200 }
        );
      } else if (jsonFinalResponse.status === "failed") {
        console.log("FAILED replicate: ", jsonStartResponse);
        res.status(500).json({
          message: "Replicate failed",
        });
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } else {
    // invia un errore se il metodo della richiesta non è POST
    res
      .status(405)
      .json({ message: "Il metodo della richiesta non è consentito." });
  }
}
