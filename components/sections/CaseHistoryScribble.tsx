import ImagesCard from "../ImagesCard";
import owl from "../../public/owl.jpg";
import owlAI from "../../public/owl-ai.jpg";
import palm from "../../public/palm.jpg";
import palmAI from "../../public/palm-ai.jpg";

const creations = [
  [
    {
      originalImg: owl,
      generatedImg: owlAI,
      prompt: "Owl",
    },
    {
      originalImg: palm,
      generatedImg: palmAI,
      prompt: "Palm",
    },
  ],
];

export default function CaseHistoryScribble() {
  return (
    <div className="py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
            I disegni li facciamo{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Amanella
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Se non ti fidi, ecco alcuni esempi
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 max-w-2xl gap-6 sm:gap-8 lg:mt-16 lg:max-w-none"
        >
          {creations.map((column, columnIndex) => (
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
    </div>
  );
}
