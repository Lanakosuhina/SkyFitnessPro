type TitleType = {
  label: string;
};

export default function Title({ label }: TitleType) {
  return (
    <h1 className="font-roboto-500 text-2xl lg:text-6xl font-medium text-black mb-[10px] lg:mb-6">
      {label}
    </h1>
  );
}
