"use client";
import { useState } from "react";
import Image from "next/image";
import Dropzone from "./Dropzone";

export default function DropAndVisualize() {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });

  return <div className="flex flex-col items-center"></div>;
}
