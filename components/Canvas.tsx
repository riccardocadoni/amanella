import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import seed from "lib/seed";
import { Undo2 as UndoIcon, Trash2 as TrashIcon } from "lucide-react";

export interface ICanvas {
  setData: Dispatch<
    SetStateAction<{
      image: any;
      prompt: string | null;
    }>
  >;
  scribbleExists: boolean;
  setScribbleExists: Dispatch<SetStateAction<boolean>>;
}

export default function Canvas({
  setData,
  scribbleExists,
  setScribbleExists,
}: ICanvas) {
  const canvasRef = React.useRef<any>(null);

  useEffect(() => {
    loadStartingPaths();
  }, []);

  const startingPaths = seed;

  async function loadStartingPaths() {
    await canvasRef.current.loadPaths(startingPaths.paths);
    setScribbleExists(true);
    onChange();
  }

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    if (!paths.length) return;

    setScribbleExists(true);

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
    <div className="relative md:w-[400px] ">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair rounded-none"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
      />

      <div className="flex justify-center gap-5 p-2">
        <button
          className="disabled:opacity-30"
          onClick={undo}
          disabled={!scribbleExists}
        >
          <UndoIcon className="h-5 w-5" />
        </button>
        <button
          className="disabled:opacity-30"
          onClick={reset}
          disabled={!scribbleExists}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
