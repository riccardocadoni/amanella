import Dropzone from "../../components/Dropzone";
import CaseHistory from "../../components/sections/CaseHistory";
import HeadPro from "../../components/sections/HeadPro";
import Info from "../../components/sections/Info";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center divide-y pb-10">
      <HeadPro />
      <Dropzone />
      <CaseHistory />
      <Info />
    </div>
  );
}
