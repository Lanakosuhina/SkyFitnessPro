"use client";
import withPrivateRoute from "@/HOC/withPrivateRoute";
import { app, database } from "@/app/firebase";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Button from "@/components/Button/Button";
import ProgressForm from "@/components/ProgressForm/ProgressForm";
import Title from "@/components/Title/Title";
import VideoComponent from "@/components/Video/Video";
import WorkoutProgress from "@/components/WorkoutProgress/WorkoutProgress";
import { ExerciseType, UserWorkoutType, WorkoutType } from "@/types";
import { User, getAuth } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { Suspense, useEffect, useState } from "react";

type WorkoutPageType = {
  params: {
    id: string;
    course: string;
    courseid: string;
  };
};

export type ExerciseArrayType = [string, ExerciseType];

function WorkoutPage({ params }: WorkoutPageType) {
  const auth = getAuth(app);
  const workoutId = params.id;
  const courseId = params.courseid;
  const courseName = params.course;

  const [workoutList, setWorkoutList] = useState<UserWorkoutType[]>([]);
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [exercises, setExercises] = useState<ExerciseArrayType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rusName, setRusName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
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

  function closeSuccessModal() {
    setIsSuccess(false);
    setIsOpen(false);
  }

  function openSuccessModal() {
    setIsSuccess(true);
    setTimeout(closeSuccessModal, 1500);
  }

  useEffect(() => {
    switch (courseName) {
      case 'BodyFlex':
        setRusName('Бодифлекс');
        break;
      case 'DanceFitness':
        setRusName('Танцевальный фитнес');
        break;
      case 'StepAirobic':
        setRusName('Степ-аэробика');
        break;
      case 'Stretching':
        setRusName('Стретчинг');
        break;
      case 'Yoga':
        setRusName('Йога');
        break;
      default:
        setRusName('');
    }
  }, [courseName]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}/exercises/`,
      ),
      snapshot => {
        if (snapshot.exists()) {
          const exercisesData: ExerciseArrayType[] = Object.entries(snapshot.val());
          setExercises(exercisesData);
        } else {
          console.log('No data available');
        }
      },
    );
  }, [auth.currentUser?.uid, workoutId, courseId]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/`,
      ),
      snapshot => {
        if (snapshot.exists()) {
          const workoutsData: UserWorkoutType[] = Object.entries(
            snapshot.val(),
          );
          setWorkoutList(workoutsData);
        } else {
          console.log('No data available');
        }
      },
    );
  }, [auth.currentUser?.uid, workoutId, courseId]);

  function toggleProgressForm() {
    setIsOpen(prevState => !prevState);
  }

  async function handleSaveChanges() {
    const arrAvr = exercises.map(exercise =>
      exercise[1].curProgress < exercise[1].quantity
        ? (exercise[1].curProgress / exercise[1].quantity) * 100
        : 100,
    );

    const progressWorkout = Math.floor(
      arrAvr.reduce((acc, number) => acc + number) / arrAvr.length,
    );

    const updatedData = exercises.map(exercise => exercise[1]);

    await update(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}/`,
      ),
      { progressWorkout: progressWorkout },
    );
    await update(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}/`,
      ),
      { exercises: updatedData },
    );

    const progressWorkoutList = workoutList.map(el =>
      el[1]._id === workoutId ? progressWorkout : el[1].progressWorkout,
    );
    const progressCourse = Math.floor(
      progressWorkoutList.reduce((acc, number) => acc + number) /
      workoutList.length,
    );

    await update(
      ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/`),
      { progressCourse: progressCourse },
    );

    openSuccessModal();
  }

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}`,
      ),
      snapshot => {
        if (snapshot.exists()) {
          const workoutData: WorkoutType = snapshot.val();
          setWorkout(workoutData);
        } else {
          console.log('No data available');
        }
      },
    );
  }, [auth.currentUser?.uid, workoutId, courseId]);

  return (
    <>
      <section>
        <Title label={rusName} />
        <Breadcrumbs text={workout ? workout.name : ''} />
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoComponent videoURL={workout ? workout.video : ''} />
          </Suspense>
        </div>
      </section>
      <section className="rounded-[30px] p-[30px] lg:p-10 bg-white shadow-def ">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-[20px]">
          Упражнения тренировки
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {exercises.length > 0 &&
            exercises.map((exercise, i) => {
              // const arrAvr = exercises.map((exercise) =>
              //   exercise[1].curProgress < exercise[1].quantity
              //     ? (exercise[1].curProgress / exercise[1].quantity) * 100
              //     : 100
              // );
              const progress = Math.floor(
                exercise[1].curProgress < exercise[1].quantity
                  ? (exercise[1].curProgress / exercise[1].quantity) * 100
                  : 100,
              )
                .toString()
                .concat('%');

              return (
                <div className="lg:w-[320px] w-[283px]" key={i}>
                  <WorkoutProgress
                    title={exercise[1].name}
                    progress={progress}
                  />
                </div>
              );
            })}
        </div>
        <div className="lg:w-[320px] max-w-[283px] w-auto mt-10">
          <Button
            title="Заполнить свой прогресс"
            onClick={toggleProgressForm}
          />
        </div>
      </section>
      {isOpen && (
        <ProgressForm
          isOpen={isSuccess}
          setExercises={setExercises}
          handleSaveChanges={handleSaveChanges}
          exercises={exercises}
        />
      )}
    </>)
}

export default withPrivateRoute(WorkoutPage);
