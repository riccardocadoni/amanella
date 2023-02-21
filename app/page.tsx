import Dropzone from "../components/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center pb-10">
      <h1 className="text-5xl font-bold p-10">
        Dai vita ai tuoi disegni con il potere dell'AI
      </h1>
      <h2 className="text-3xl text-slate-700 pb-10">
        Inserisci i tuoi disegni e trasformali in vibranti creazioni uniche.
      </h2>
      <div>
        <Dropzone />
      </div>
    </div>
  );
}
