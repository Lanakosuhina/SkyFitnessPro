import { useRef } from 'react';

type FieldProgressFormType = {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FieldProgressForm({
  label,
  id,
  value,
  onChange,
}: FieldProgressFormType) {
  function clearInputValue() {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <label className="font-roboto-400 text-black text-[18px] font-normal ">
      {label}
      <input
        className="font-roboto-400 w-[237px] lg:w-[320px] h-[52px] mb-5 border rounded-lg border-gray border-solid text-black text-[18px] font-normal px-[18px] py-[16px] mr-5"
        type="number"
        min="0"
        ref={inputRef}
        step="1"
        placeholder="0"
        id={id}
        defaultValue={value}
        onChange={onChange}
        onFocus={clearInputValue}
      />
    </label>
  );
}
