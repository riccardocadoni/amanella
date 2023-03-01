"use client";
import { useState } from "react";
import Scribble from "./Scribble";
import Dropzone from "./Dropzone";
import ColoredRadioButton from "./ColoredRadioButton";

export default function MainScribble() {
  const [isScribble, setIsScribble] = useState(true);
  return (
    <div className="py-10">
      <div className="flex gap-2 items-center justify-center ">
        <ColoredRadioButton
          isDisabled={isScribble}
          onClick={() => setIsScribble(true)}
          text={"Disegna"}
        />
        <ColoredRadioButton
          isDisabled={!isScribble}
          onClick={() => setIsScribble(false)}
          text={"Carica un disegno"}
        />
      </div>

      {isScribble ? <Scribble /> : <Dropzone isScribble={true} />}
    </div>
  );
}
