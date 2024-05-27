import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import WorkoutProgress from "../WorkoutProgress/WorkoutProgress";
import { removeSubscribedCourse } from "@/utils/removeSubscribedCourse";
import { addCourseUser } from "@/utils/writeUserData";
import { getAuth } from "firebase/auth";
import { CourseType } from "@/types";
import { useRouter } from "next/navigation";

type CourseCardType = {
  imgURL: string;
  title: string;
  isSubscribed: boolean;
  progress?: string;
  courseId: string;
  course?: CourseType;
};

export default function CourseCard({
  course,
  courseId,
  progress,
  isSubscribed,
  imgURL,
  title,
}: CourseCardType) {
  const router = useRouter();

  async function handlerAddCourse(
    e: React.BaseSyntheticEvent<
      MouseEvent,
      EventTarget & SVGSVGElement,
      EventTarget
    >,
  ) {
    e.stopPropagation();

    const userId = getAuth();
    if (!course) return;
    if (!userId.currentUser) return router.replace('/signin');

    await addCourseUser({ userId: userId.currentUser?.uid, courseId, course });
  }

  return (
    <div
      onClick={() => router.replace(`/course/${courseId}`)}
      className="relative w-[343px] md:w-[343px] bg-[#FFFFFF] rounded-[30px] hover:translate-y-1 hover:scale-105 duration-300 hover:shadow-lg "    >
      <div title="">
        <Image
          className="rounded-[30px] h-[325px]"
          src={`/img/${imgURL}.png`}
          alt={`${imgURL}`}
          width={560}
          height={550}
          priority={true}
        />

        {isSubscribed ? (
          <svg
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
              e.stopPropagation();
              removeSubscribedCourse(courseId);
            }}
            className="absolute w-8 h-8 right-[20px] top-[20px] z-10 cursor-custom"
          >
            <g>
              <title>Удалить курс</title>
              <use xlinkHref={`/img/sprite.svg#icon-minus`}></use>
            </g>
          </svg>
        ) : (
          <svg
            onClick={e => handlerAddCourse(e)}
            className="absolute w-8 h-8 right-[20px] top-[20px] z-10 cursor-custom"
          >
            <g>
              <title>Добавить курс</title>
              <use xlinkHref={`/img/sprite.svg#icon-plus`}></use>
            </g>
          </svg>
        )}
      </div>
      <div className="flex flex-col px-[30px] pt-6 pb-4 gap-y-[18px]">
        <h2 className="font-roboto-500 text-[24px] lg:text-[32px] leading-8">
          {title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-calendar`}></use>
            </svg>
            <p className="text-[16px] leading-[110%] lg:text-[18px]">25 дней</p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-time`}></use>
            </svg>
            <p className="text-base leading-[110%] lg:text-[18px]">
              20-50 мин/день
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-level`}></use>
            </svg>
            <p className="text-base leading-[110%] lg:text-[18px]">Сложность</p>
          </div>
        </div>
        {progress && (
          <div className="flex flex-col gap-10">
            <WorkoutProgress title="Прогресс" progress={progress} />
            <Link
              onClick={e => e.stopPropagation()}
              href={`/selection/${courseId}`}
            >
              <Button title="Продолжить" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
