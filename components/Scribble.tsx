"use client";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import LoadingDots from "./LoadingDots";
import downloadPhoto from "../utils/downloadPhoto";
import appendNewToName from "../utils/appendNewToName";
import { Download, Wand2, Trash2 } from "lucide-react";
import GenerationVisualizer from "./GenerationVisualizer";
import Loading from "./Loading";
import Canvas from "./Canvas";

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 500;

export default function Scribble() {
  const [data, setData] = useState<{
    image: any;
    prompt: string | null;
  }>({
    image: null,
    prompt: null,
  });
  const [scribbleExists, setScribbleExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

  const handleGeneration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.image) return;
    if (!data.prompt) return;
    setIsLoading(true);
    const res = await fetch("/api/scribble", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const { generatedImageUrl } = await res.json();
      setGeneratedImageUrl(generatedImageUrl);
      setIsLoading(false);
    } else {
      if (res.status === 502) {
        setIsLoading(false);
        alert("Whoops, purtroppo c'è un po' di coda, riprova in un minuto!");
      } else {
        setIsLoading(false);
        alert("Whoops, qualcosa è andato storto, riprova più tardi");
      }
    }
  };

  if (generatedImageUrl || isLoading) {
    const originalPhoto = data?.image;
    const prompt = data?.prompt;
    return (
      <GenerationVisualizer
        isLoading={isLoading}
        isScribble
        originalPhoto={originalPhoto}
        prompt={prompt}
        generatedImageUrl={generatedImageUrl}
        setGeneratedImageUrl={setGeneratedImageUrl}
        setData={setData}
      />
    );
  }

  return (
    <div className="py-10 ">
      <form
        className="flex flex-col gap-6 bg-gray-50"
        onSubmit={(e) => handleGeneration(e)}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="block text-sm font-medium text-gray-700">Disegno</p>
          </div>
        </div>
        <Canvas
          setData={setData}
          scribbleExists={scribbleExists}
          setScribbleExists={setScribbleExists}
        />
        <div className="flex flex-col text-left">
          <label className="mb-2 text-sm font-medium text-black">
            Descrizione
          </label>
          <input
            type="text"
            id="prompt"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:outline-black w-full p-2.5 "
            placeholder="Descrivi il soggetto in inglese, es. Mountain"
            value={data.prompt || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, prompt: e.target?.value }))
            }
          />
        </div>

        <button
          disabled={!data.image || !data.prompt}
          className={`${
            !data.image || !data.prompt
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : "p-0.5 rounded-md bg-gradient-to-r to-red-600 via-orange-500 from-yellow-400 hover:text-white"
          } rounded-md`}
        >
          <span
            className={`${
              !data.image || !data.prompt
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : " bg-white hover:bg-inherit hover:text-white"
            } flex flex-grow items-center justify-center text-black px-4 py-2 font-semibold rounded`}
          >
            <p className="pr-2 ">Colora</p>
            <Wand2 className="h-5 w-5" />
          </span>
        </button>
      </form>
    </div>
  );
}
