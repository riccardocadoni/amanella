"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Dropzone, { IFileWithPreview } from "./Dropzone";

export default function DropAndVisualize() {
  const [file, setFile] = useState<IFileWithPreview>();

  const handleUpload = async (file: IFileWithPreview) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/draw", {
        method: "POST",
        body: formData,
      });

      console.log(response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {file?.preview ? (
        <div className="relative h-96 w-96">
          <Image
            alt="dropped image"
            src={file.preview}
            fill
            object-fit="contain"
          />
        </div>
      ) : (
        <Dropzone {...{ setFile }} />
      )}
      {file?.preview && (
        <div className="flex p-10 gap-5">
          <button
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => handleUpload(file)}
          >
            Invia
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => setFile(undefined)}
          >
            Carica nuova immagine
          </button>
        </div>
      )}
    </div>
  );
}
