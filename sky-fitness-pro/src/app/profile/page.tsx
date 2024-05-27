"use client";
import Image from "next/image";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import CourseCard from "@/components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { app, database } from "../firebase";
import Link from "next/link";
import { onValue, ref } from "firebase/database";
import { UserWorkoutType } from "@/types";
import withPrivateRoute from './../../HOC/withPrivateRoute';

type CourseType = {
  _id: string;
  nameEN: string;
  nameRU: string;
  progressCourse: number;
  workouts: UserWorkoutType[];
};

type CoursesArrayType = [string, CourseType][];

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);
  const [courses, setCourses] = useState<CoursesArrayType>([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);

      } else {
        setUser(user);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(database, `users/${auth.currentUser?.uid}/courses`),
      snapshot => {
        if (snapshot.exists()) {
          const userCourseList: CoursesArrayType = Object.entries(
            snapshot.val(),
          );
          setCourses(userCourseList);
        } else {
          console.log('No data available');
          setCourses([]);
        }
      },
    );
  }, [auth.currentUser?.uid]);

  return (
    <>
      <div className="box-border bg-[#FAFAFA]">
        <h2 className="sm:mt-[0px] mt-[36px] sm:mb-[31px] mb-[19px] sm:text-[40px] text-[24px] font-bold">
          Профиль
        </h2>
        <div
          className="bg-[#FFFFFF]
                    rounded-[30px]
                    sm:h-[257px] h-[453px]
                    sm:px-[30px] px-[10px]
                    py-[30px]"
        >
          <div className="flex flex-wrap flex-row sm:space-x-[33px]">
            <div
              className="relative 
                        sm:w-[197px] w-[141px] 
                        sm:h-[197px] h-[141px]
                        sm:mx-[0px] mx-[90px]"
            >
              <Image fill src="/img/no_foto.png" alt="no foto" />
            </div>
            <div
              className="flex flex-col 
                        sm:gap-[20px] gap-[13px]
                        sm:mt-0 mt-[22px]
                        sm:ml-0 ml-[19px]"
            >
              <div className="sm:text-[32px] text-[24px] font-bold">
                {user?.email?.split('@')[0]}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="sm:text-[18px] text-[16px]">{`Логин: ${user?.email}`}</p>
                <p className="sm:text-[18px] text-[16px]">{`Пароль: ********`}</p>
              </div>
              <div className="flex flex-wrap flex-row sm:space-x-[10px] space-x-0 sm:gap-0 gap-[15px]">
                <Link href="/reset" className="sm:w-[192px] w-[283px]">
                  <Button title="Изменить пароль" />
                </Link>
                <div className="sm:w-[192px] w-[283px]">
                  <ButtonLink title="Выйти" link="/" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="sm:mt-[53px] mt-[23px] sm:mb-[31px] mb-[12px] sm:text-[40px] text-[24px] font-bold">
          Мои курсы
        </h2>
        {courses.length === 0 && <p className="sm:text-[18px] text-[16px]">У вас нет добавленных курсов </p>}
        <div className="grid grid-flow-row gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-[calc(100%-343px*2)] lg:gap-x-[calc(100%-360px*2)] xl:gap-x-[calc((100%-360px*3)/2)] md:gap-y-8 main:gap-x-10 main:gap-y-8 item-start">        
          {courses.map(course => {
          const progress = course[1].progressCourse.toString().concat('%');
          return (
            <CourseCard
              key={course[0]}
              title={course[1].nameRU}
              imgURL={course[1].nameEN}
              isSubscribed={true}
              courseId={course[0]}
              progress={progress}
            />
          );
        })}
        </div>
      </div>
    </>
  );
}

export default withPrivateRoute(ProfilePage);
