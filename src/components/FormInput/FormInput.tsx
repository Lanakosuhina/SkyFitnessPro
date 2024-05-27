export type InputPropsType = {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function FormInput({
  type,
  name,
  placeholder,
  onChange,
  value,
}: InputPropsType) {
  return (
    <input
      onChange={onChange}
      className="px-[18px] py-[16px] mb-2.5 border border-[#D0CECE] rounded-[8px] w-full text-[16px/18px] leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}
