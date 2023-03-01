export interface IColoredButton {
  isDisabled: boolean;
  text: string;
  onClick?: any;
}

export default function ColoredRadioButton({
  isDisabled,
  text,
  onClick,
}: IColoredButton) {
  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick()}
      className={`${
        isDisabled
          ? "border-gray-200 bg-gray-100 text-gray-400"
          : `p-0.5 rounded-md bg-gray-100 hover:bg-orange-600`
      } rounded-md text-center flex-1`}
    >
      <span
        className={`${
          isDisabled ? `bg-orange-600 text-white` : " bg-slate-50"
        } flex flex-grow items-center justify-center text-black px-4 py-2 font-semibold rounded`}
      >
        <p className="">{text}</p>
      </span>
    </button>
  );
}
