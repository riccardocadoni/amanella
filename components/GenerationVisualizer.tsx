import { Download } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import Loading from "./Loading";

export interface IGenerationVisualizer {
  originalPhoto: string | null;
  generatedImageUrl: string | null;
  prompt: string | null;
  isLoading: boolean;
  isScribble?: boolean;
  setGeneratedImageUrl: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<
    SetStateAction<{
      image: string | null;
      prompt: string | null;
    }>
  >;
}

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 700;

function GenerationVisualizer({
  originalPhoto,
  generatedImageUrl,
  prompt,
  isLoading,
  isScribble,
  setGeneratedImageUrl,
  setData,
}: IGenerationVisualizer) {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-2 px-5">
        <p>{`"..${prompt}"`}</p>
        <div className="flex sm:space-x-2 sm:flex-row flex-col">
          <Image
            src={originalPhoto!}
            alt="Drawing"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="rounded-md border"
          />
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              src={generatedImageUrl!}
              alt="Genereated image"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="rounded-md border"
            />
          )}
        </div>
        {!isLoading && (
          <div className="flex sm:flex-row flex-col w-full gap-2">
            {!isScribble && (
              <button
                className={
                  "p-0.5 bg-gradient-to-r to-red-600 via-orange-500 from-yellow-400 hover:text-white flex w-full items-center justify-center rounded-md text-sm transition-all"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setGeneratedImageUrl(null);
                  setData({ image: null, prompt: null });
                }}
              >
                <span className="bg-white hover:bg-inherit hover:text-white flex flex-grow items-center justify-center text-black px-4 py-2 font-semibold rounded">
                  <p className="text-sm">Nuova immagine</p>
                </span>
              </button>
            )}
            <button
              className={
                "p-0.5 bg-gradient-to-r to-red-600 via-orange-500 from-yellow-400 hover:text-white flex w-full items-center justify-center rounded-md text-sm transition-all"
              }
              onClick={(e) => {
                e.preventDefault();
                setGeneratedImageUrl(null);
              }}
            >
              <span className="bg-white hover:bg-inherit hover:text-white flex flex-grow items-center justify-center text-black px-4 py-2 font-semibold rounded">
                <p className="text-sm">Prova ancora</p>
              </span>
            </button>
            <button
              onClick={() => {
                downloadPhoto(
                  generatedImageUrl!,
                  appendNewToName("amanella-image")
                );
              }}
              className={
                "border-black bg-black text-white hover:bg-white hover:text-black flex w-full h-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none invisible md:visible"
              }
            >
              <p className="text-sm mr-3">Scarica la foto</p>
              <Download className="h-5 w-5 group-hover:text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
    /*   <div className="flex flex-col rounded-2xl bg-white p-3 shadow-xl shadow-slate-900/10">
      
    </div> */
  );
}

export default GenerationVisualizer;
