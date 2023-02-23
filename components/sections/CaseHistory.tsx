import ImagesCard from "../ImagesCard";

const testimonials = [
  [
    {
      originalImg: "/mountain.jpg",
      generatedImg: "/mountain-ai.jpg",
      prompt: "A mountain",
    },
    {
      originalImg: "/dog.jpg",
      generatedImg: "/dog-ai.jpg",
      prompt: "A dog",
    },
    {
      originalImg: "/flower.jpg",
      generatedImg: "/flower-ai.jpg",
      prompt: "A flower",
    },
  ],
];

export default function CaseHistory() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            Amato da migliaia di artisti
          </h1>
          {/*  <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Il nostro sito ti permette di caricare i tuoi disegni fatti a mano e
            di trasformarli in immagini colorate e dettagliate. Basta caricare
            una foto del tuo disegno e il modello di intelligenza artificiale
            farà il resto!
          </p> */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Ecco alcuni esempi, tutti creati con Amanella
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 max-w-2xl gap-6 sm:gap-8 lg:mt-16 lg:max-w-none"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map(
                  ({ originalImg, generatedImg, prompt }, testimonialIndex) => (
                    <li
                      key={testimonialIndex}
                      className="hover:scale-105 transition duration-300 ease-in-out"
                    >
                      <ImagesCard
                        originalImg={originalImg}
                        generatedImg={generatedImg}
                        prompt={prompt}
                      />
                    </li>
                  )
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
