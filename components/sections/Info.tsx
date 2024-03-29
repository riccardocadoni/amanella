export default function Info() {
  return (
    <div className="py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            Come funziona
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Questo prodotto utilizza un modello di intelligenza artificiale per
            generare una nuova immagine partendo da un&apos;immagine di input e
            mantenendone la struttura. (Stable diffusion - ControlNet)
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            Privacy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            La privacy è importante, le immagini che carichi e quelle generate
            vengono cancellate automaticamente dopo un&apos;ora.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Non salviamo le tue creazioni, ricordati quindi di scaricare le
            immagini con il tasto download se non vuoi perderle
          </p>
        </div>
      </div>
    </div>
  );
}
