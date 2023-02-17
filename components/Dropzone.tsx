"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

export interface IFileWithPreview extends File {
  preview?: string;
}
export interface IDropzone {
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

export default function Dropzone({ setFile }: IDropzone) {
  const onDrop = useCallback((acceptedFiles: IFileWithPreview[]) => {
    const acceptedFile = acceptedFiles[0];
    console.log(acceptedFile);
    setFile(
      Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile),
      })
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps({
          className: "border-cyan-700 border-2 border-dashed rounded-lg p-20",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </>
  );
}
