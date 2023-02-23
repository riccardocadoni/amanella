import { ReactNode } from "react";

export interface IButton {
  isDisabled: boolean;
  icon: ReactNode;
}

function Button({ isDisabled, icon }: IButton) {
  return (
    <button
      disabled={isDisabled}
      className={`${
        isDisabled
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : "p-px rounded-md bg-gradient-to-r to-red-600 via-orange-500 from-yellow-400 hover:text-white"
      } rounded-md border`}
    >
      <span
        className={`${
          isDisabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : " bg-white hover:bg-inherit hover:text-white"
        } flex flex-grow items-center justify-center text-black px-4 py-2 font-semibold rounded-md`}
      >
        <p className="pr-2 ">Colora</p>
        {icon}
      </span>
    </button>
  );
}

export default Button;
