"use client";
import { app, database } from "@/app/firebase";
import Button from "@/components/Button/Button";
import WorkoutItem from "@/components/WorkoutItem/WorkoutItem";
import { WorkoutType } from "@/types";
import { User, getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SelectionPageType = {
  params: {
    id: string;
  };
};

export default function SelectionPage({ params }: SelectionPageType) {
  const [courseId, setCourseId] = useState('');
  const auth = getAuth(app);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [courseName, setCourseName] = useState<string | number | WorkoutType>("");
  const [selected, setSelected] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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
    setCourseId(params.id);
  }, [params]);

  const fetchCourse = useCallback(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/`),
      snapshot => {
        if (snapshot.exists()) {
          const course: (string | number | WorkoutType)[] = Object.values(snapshot.val());
          setCourseName(course[1]);
          const workoutList: WorkoutType[] = Object.values(course[4]);
          workoutList.sort((a, b) => (a.name > b.name ? 1 : -1));
          console.log(workoutList);
          setWorkouts(workoutList);
        } else {
          console.log('No data available');
        }
      },
    );
  }, [auth.currentUser?.uid, courseId]);
  
  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="relative">
      <div
        className="fixed top-[116px] md:top-[183px] left-[calc(50%-(343px/2))]  md:left-[calc(50%-(460px/2))]
     bg-white  rounded-[30px] shadow-def w-[343px] md:w-[460px]  p-[30px] md:p-[40px] "
      >
        <h2 className="font-skyeng text-[32px] leading-[110%] text-center mb-[34px] md:mb-[48px]">
          Выберите тренировку
        </h2>
        <ul className="max-h-[360px] mb-[34px]  overflow-y-scroll">
          {workouts?.map((workout, i) => {
            const shortWorkoutName = workout.name.split("/")[0];
            return (
              <WorkoutItem
              isDone={workout.progressWorkout === 100}
                setSelected={setSelected}
                workoutName={shortWorkoutName}
                key={i}
                id={workout._id}
              />
            );
          })}
        </ul>
        <Button
          title="Начать"
          onClick={() =>
            router.replace(`/workout/${courseName}/${courseId}/${selected}`)
          }
        />
      </div>
    </div>
  );
}
