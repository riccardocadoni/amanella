import Image, { StaticImageData } from "next/image";

export interface IImagesCard {
  originalImg: StaticImageData;
  generatedImg: StaticImageData;
  prompt: string;
}

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 700;

function ImagesCard({ originalImg, generatedImg, prompt }: IImagesCard) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-3 shadow-xl shadow-slate-900/10">
      <p className="text-lg pb-3">{`"..${prompt}"`}</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="relative w-80 h-auto md:w-96 md:h-auto">
          <Image
            src={originalImg!}
            alt="Drawing"
            //object-fit="contain"
            className="rounded-md border"
          />
        </div>
        <div className="relative w-80 h-auto md:w-96 md:h-auto">
          <Image
            src={generatedImg}
            alt="Genereated image"
            className="rounded-md border"
          />
        </div>
      </div>
    </div>
  );
}

export default ImagesCard;
