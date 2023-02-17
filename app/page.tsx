import Dropzone from "../components/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold p-10">
        Dai vita ai tuoi disegni con il potere dell'AI
      </h1>
      <h2 className="text-3xl p-5 text-slate-700">
        Inserisci i tuoi disegni e trasformali in vibranti creazioni uniche.
      </h2>
      <div>
        <Dropzone />
      </div>
      <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
        Invia
      </button>
    </div>
  );
}
