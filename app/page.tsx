import Dropzone from "../components/Dropzone";
import CaseHistory from "../components/sections/CaseHistory";
import Head from "../components/sections/Head";
import Info from "../components/sections/Info";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center pb-10">
      <Head />
      <Dropzone />
      <CaseHistory />
      <Info />
    </div>
  );
}
