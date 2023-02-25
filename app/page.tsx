import Scribble from "@/components/components/Scribble";
import CaseHistoryScribble from "../components/sections/CaseHistoryScribble";
import HeadScribble from "../components/sections/HeadScribble";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center divide-y pb-10">
      <HeadScribble />
      <Scribble />
      <CaseHistoryScribble />
    </div>
  );
}
