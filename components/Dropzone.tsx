"use client";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import LoadingDots from "./LoadingDots";
import downloadPhoto from "../utils/downloadPhoto";
import appendNewToName from "../utils/appendNewToName";
import { Download, Wand2, Trash2 } from "lucide-react";

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 500;

export default function Dropzone() {
  const [data, setData] = useState<{
    image: string | null;
    prompt: string | null;
  }>({
    image: null,
    prompt: null,
  });
  const [fileSizeTooBig, setFileSizeTooBig] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const inputRef = useRef<any>(null);

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFileSizeTooBig(false);
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          setFileSizeTooBig(true);
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData]
  );

  const handleGeneration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!data.image) return;
    if (!data.prompt) return;
    const res = await fetch("/api/draw", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const { generatedImageUrl } = await res.json();
      setGeneratedImageUrl(generatedImageUrl);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("Whoops, qualcosa è andato storto, riprova più tardi");
    }
  };

  if (isLoading) {
    return (
      <section id="dropzone" aria-label="Core component" className="py-10">
        <div className="flex flex-col justify-center gap-5 items-center w-full h-64">
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Lo sappiamo che stai ansiosamente aspettando... ma il risultato ne
            varrà la pena!
          </p>
          <LoadingDots color="black" style="large" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Solitamente pronto in pochi secondi, in alcuni casi potrebbe
            impiegarci qualche minuto 🚀
          </p>
        </div>
      </section>
    );
  }

  if (generatedImageUrl) {
    const originalPhoto = data?.image;
    return (
      <section id="dropzone" aria-label="Core component" className="py-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex sm:space-x-2 sm:flex-row flex-col">
            <Image
              src={originalPhoto!}
              alt="Drawing"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="rounded-md border"
            />
            <Image
              src={generatedImageUrl}
              alt="Genereated image"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="rounded-md border"
            />
          </div>
          <div className="flex sm:flex-row flex-col w-full gap-2">
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
                "border-black bg-black text-white hover:bg-white hover:text-black flex w-full h-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
              }
            >
              <p className="text-sm mr-3">Scarica la foto</p>
              <Download className="h-5 w-5 group-hover:text-black" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dropzone" aria-label="Core component" className="py-10">
      <form
        className="flex flex-col gap-6 bg-gray-50"
        onSubmit={(e) => handleGeneration(e)}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="block text-sm font-medium text-gray-700">Disegno</p>
            {fileSizeTooBig && (
              <p className="text-sm text-red-500">
                File size too big (max 5MB)
              </p>
            )}
          </div>
          <label
            htmlFor="image-upload"
            className={`group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50 ${
              data.image ? "w-64 h-auto md:w-96" : "w-64 h-64 md:w-96 md:h-64"
            }`}
          >
            <div
              className="absolute z-[5] h-full w-full rounded-md"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
                setFileSizeTooBig(false);
                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                if (file) {
                  if (file.size / 1024 / 1024 > 5) {
                    setFileSizeTooBig(true);
                  } else {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setData((prev) => ({
                        ...prev,
                        image: e.target?.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
            />
            <div
              className={`${
                dragActive ? "border-2 border-black" : ""
              } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                data.image
                  ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                  : "bg-white opacity-100 hover:bg-gray-50"
              }`}
            >
              <p className="mt-2 text-center text-sm text-gray-500">
                Trascina e rilascia o fai click per caricare l&apos;immagine
              </p>
              <span className="sr-only">Photo upload</span>
            </div>
            {data.image && (
              <Image
                src={data.image}
                alt="Preview"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="h-full  rounded-md object-cover"
              />
            )}
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="image-upload"
              ref={inputRef}
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangePicture}
            />
          </div>
          {data.image && (
            <button
              onClick={() => {
                inputRef.current.value = "";
                setData((prev) => ({ ...prev, image: null }));
              }}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex flex-col text-left">
          <label
            //htmlFor="prompt"
            className="mb-2 text-sm font-medium text-black"
          >
            Descrizione
          </label>
          <input
            type="text"
            id="prompt"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:outline-black w-full p-2.5 "
            placeholder="Descrivi il soggetto in inglese, es. A dog"
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
    </section>
  );
}
