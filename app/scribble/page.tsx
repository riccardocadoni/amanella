import Scribble from "@/components/components/Scribble";
import Head from "@/components/components/sections/Head";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center divide-y pb-10">
      <Head />
      <Scribble />
    </div>
  );
}
