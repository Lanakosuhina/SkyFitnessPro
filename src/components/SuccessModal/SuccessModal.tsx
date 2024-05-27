import SVG from '../SVG/SVG';

export default function SuccessModal() {
  return (
    <div className="flex flex-col items-center bg-white w-[343px] p-[30px] lg:w-[426px] lg:p-10 rounded-[30px] shadow-def text-center">
      <h3 className="font-skyeng text-[40px] text-black mb-10">
        Ваш прогресс засчитан!
      </h3>
      <SVG icon="icon-success" className="w-14 h-14" />
    </div>
  );
}
