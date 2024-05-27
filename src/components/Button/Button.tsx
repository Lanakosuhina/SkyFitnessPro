import { ButtonType } from "@/types";

export default function Button({ title, onClick, type }: ButtonType) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="justify-self-center font-roboto-400  rounded-full w-full h-[52px] px-5 bg-lime text-lg text-black hover:bg-limeHover active:bg-black active:text-white cursor-custom"
    >
      {title}
    </button>
  );
}
