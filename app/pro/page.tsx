import Link from "next/link";
import Dropzone from "../../components/Dropzone";
import CaseHistory from "../../components/sections/CaseHistory";
import HeadPro from "../../components/sections/HeadPro";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center divide-y pb-10">
      <HeadPro />
      <Dropzone />
      <div className="flex flex-row py-10 h-10 items-center justify-center">
        <p className="mx-auto max-w-xl text-2xl text-slate-700 leading-7">
          Non hai un disegno? Clicca
        </p>
        <Link
          href="/"
          className="flex ml-2 px-1 border-black w-auto h-auto items-center justify-center rounded-md border"
        >
          QUI
        </Link>
      </div>
      <CaseHistory />
    </div>
  );
}
