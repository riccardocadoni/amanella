"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Image from "next/image";

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 600;

export default function Dropzone() {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });
  const [fileSizeTooBig, setFileSizeTooBig] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

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
      alert("Something went wrong. Please try again later.");
    }
  };

  console.log("generatedImageUrl", generatedImageUrl);

  if (generatedImageUrl) {
    const originalPhoto = data?.image || "/hand-logo.png";
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="flex sm:space-x-2 sm:flex-row flex-col">
          <Image
            src={originalPhoto}
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
        <button
          className={
            "border-black bg-black text-white hover:bg-white hover:text-black flex w-1/2 h-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          }
          onClick={() => setGeneratedImageUrl(null)}
        >
          <p className="text-sm">Upload new image</p>
        </button>
      </div>
    );
  }

  return (
    <>
      <form
        className="flex flex-col gap-6 bg-gray-50 md:px-16"
        onSubmit={(e) => handleGeneration(e)}
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-64">
            <p className="block text-sm font-medium text-gray-700">Drawing</p>
            {fileSizeTooBig && (
              <p className="text-sm text-red-500">
                File size too big (max 5MB)
              </p>
            )}
          </div>
          <label
            htmlFor="image-upload"
            className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
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
                Drag and drop or click to upload.
              </p>
              {/* <p className="mt-2 text-center text-sm text-gray-500">
                Recommended: 1:1 square ratio, with a clear view of your face
              </p> */}
              <span className="sr-only">Photo upload</span>
            </div>
            {data.image && (
              <Image
                src={data.image}
                alt="Preview"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="h-full w-full rounded-md object-cover"
              />
            )}
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangePicture}
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          className={`${
            isLoading
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {isLoading ? (
            <p className="text-sm">Loading ...</p>
          ) : (
            <p className="text-sm">Upload</p>
          )}
        </button>
      </form>
    </>
  );
}
