// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type ResData = {
  generatedImageURl?: string | null;
  message?: string;
};

const SCRIBBLE_ENDPOINT =
  "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
  res: NextApiResponse<ResData>
) {
  const { image, prompt, isOilPainting } = await req.json();

  /* const fixedimageurl =
    "https://replicate.delivery/pbxt/QCu7ptAKCVbBMt6ot8dFbQjfxAgZjd1667b27gQEbWjuj9QIA/output_1.png";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Response(
    JSON.stringify({
      generatedImageUrl: fixedimageurl,
    }),
    { status: 200 }
  ); */

  if (req.method === "POST") {
    const enrichedPrompt = isOilPainting
      ? `An oil painting of a beautiful ${prompt}, masterpiece`
      : `A photo of ${prompt}, realistic, 4k ,iperrealism`;
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
          version: SCRIBBLE_ENDPOINT,
          input: {
            prompt: enrichedPrompt,
            image: image,
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
        console.log("GeneratedImage URL: ", generatedImage);
        return new Response(
          JSON.stringify({
            generatedImageUrl: generatedImage,
          }),
          { status: 200 }
        );
      } else if (jsonFinalResponse.status === "failed") {
        console.log("FAILED replicate: ", jsonStartResponse);
        return new Response(
          JSON.stringify({
            message: "Replicate failed",
          }),
          { status: 500 }
        );
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } else {
    // invia un errore se il metodo della richiesta non è POST
    return new Response(
      JSON.stringify({
        message: "Http method not allowed",
      }),
      { status: 405 }
    );
  }
}
