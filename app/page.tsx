import Link from "next/link";
import MainScribble from "../components/MainScribble";
import CaseHistoryScribble from "../components/sections/CaseHistoryScribble";
import HeadScribble from "../components/sections/HeadScribble";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center divide-y pb-10">
      <HeadScribble />
      <MainScribble />
      <div className="flex flex-row py-10 gap-1 flex-wrap items-center justify-center">
        <p className="mx-auto max-w-xl text-2xl text-slate-700 leading-7">
          Hai un disegno molto dettagliato?
        </p>
        <div className="flex flex-row items-center justify-center">
          <p className="mx-auto max-w-xl text-2xl text-slate-700 leading-7">
            Clicca
          </p>
          <Link
            href="/pro"
            className="flex ml-2 px-1 border-black w-auto h-auto items-center justify-center rounded-md border"
          >
            QUI
          </Link>
        </div>
      </div>
      <CaseHistoryScribble />
    </div>
  );
}
