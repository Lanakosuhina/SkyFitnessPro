import { database } from "@/app/firebase";
import { CourseType, NewWorkoutContentType, UserWorkoutType } from "@/types";
import { child, get, ref } from "firebase/database";

export async function getCourseWorkouts({
    course,
    workoutsList,
  }: {
    course: CourseType;
    workoutsList: NewWorkoutContentType;
  }) {
    let arrAllWorkouts: UserWorkoutType[] = [];
  
    await get(child(ref(database), 'workouts'))
      .then(snapshot => {
        if (snapshot.exists()) {
          arrAllWorkouts = Object.entries(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  
    const courseWorkouts = arrAllWorkouts.filter(workout =>
      course.workouts.includes(workout[0]),
    );
    Object.values(courseWorkouts).forEach(workout => {
      const workoutNewContent = { ...workout[1], progressWorkout: 0 };
      const newKey: string = workout[0];
      workoutsList[newKey] = workoutNewContent;
    });
  
    return workoutsList;
  }
  