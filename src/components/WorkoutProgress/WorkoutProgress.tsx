type WorkoutProgressType = {
  title: string;
  progress: string;
};
export default function WorkoutProgress({
  title,
  progress,
}: WorkoutProgressType) {
  return (
    <div>
      <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
        {`${title} ${progress}`}
      </p>
      <div className="w-auto h-[6px] bg-grayLight  rounded-full ">
        <div
          className="rounded-full h-[100%] bg-blueLight"
          style={{ width: progress }}
        ></div>
      </div>
    </div>
  );
}
