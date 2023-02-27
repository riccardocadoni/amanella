import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import seed from "lib/seed";
import { Undo2 as UndoIcon, Trash2 as TrashIcon } from "lucide-react";

export interface IPath {
  drawMode: boolean;
  strokeColor: string;
  strokeWidth: number;
  paths: {
    x: number;
    y: number;
  }[];
  startTimestamp: number;
  endTimestamp: number;
}

export interface ICanvas {
  setData: Dispatch<
    SetStateAction<{
      image: any;
      prompt: string | null;
    }>
  >;
  scribbleExists: boolean;
  setScribbleExists: Dispatch<SetStateAction<boolean>>;
  paths?: any;
  setPaths?: any;
}

export default function Canvas({
  setData,
  scribbleExists,
  setScribbleExists,
  paths,
  setPaths,
}: ICanvas) {
  const canvasRef = React.useRef<any>(null);

  useEffect(() => {
    loadPaths();
  }, []);

  async function loadPaths() {
    if (paths) {
      await canvasRef.current.loadPaths(paths);
    } else loadStartingPaths();
  }

  const startingPaths = seed;

  async function loadStartingPaths() {
    await canvasRef.current.loadPaths(startingPaths.paths);
    setScribbleExists(true);
    onStroke();
  }

  const onStroke = async () => {
    const paths = await canvasRef.current.exportPaths();
    if (!paths.length) return;
    setScribbleExists(true);
    setPaths(paths);
    const data = await canvasRef.current.exportImage("png");
    setData((prev) => ({ ...prev, image: data }));
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const reset = () => {
    setScribbleExists(false);
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="relative w-[350px] h-[430px] md:w-[400px] ">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Disegna qualcosa!</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair rounded-none"
        strokeWidth={4}
        strokeColor="black"
        onStroke={onStroke}
        withTimestamp={true}
      />

      <div className="flex justify-center gap-5 p-2">
        <button
          className="disabled:opacity-30"
          onClick={undo}
          type="button"
          disabled={!scribbleExists}
        >
          <UndoIcon className="h-5 w-5" />
        </button>
        <button
          className="disabled:opacity-30"
          onClick={reset}
          type="button"
          disabled={!scribbleExists}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
