import { Download } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import LoadingDots from "./LoadingDots";

export interface ILoading {}

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 700;

function Loading({}: ILoading) {
  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      <p className=" mt-6 max-w-xl text-lg text-slate-700 leading-7">
        Lo sappiamo che stai ansiosamente aspettando... ma il risultato ne varrà
        la pena!
      </p>
      <LoadingDots color="black" style="large" />
      <p className=" mt-6 max-w-xl text-lg text-slate-700 leading-7">
        Solitamente pronto in pochi secondi, in alcuni casi potrebbe impiegarci
        qualche minuto 🚀
      </p>
    </div>
  );
}

export default Loading;
