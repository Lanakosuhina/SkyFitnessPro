import Link from 'next/link';

type ButtonLinkType = {
  title: string;
  link: string;
  onClick?: () => void;
};

export default function ButtonLink({ onClick, title, link }: ButtonLinkType) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-black w-full h-[52px] px-5 bg-transparent text-lg text-[#000000] hover:bg-[#F7F7F7] active:bg-[#E9ECED] cursor-custom"
    >
      <Link className="cursor-custom" href={link}>{title}</Link>
    </button>
  );
}
