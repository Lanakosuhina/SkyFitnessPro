import { database } from "@/app/firebase";
import { CourseType, NewWorkoutContentType } from "@/types";
import { ref, set } from "firebase/database";
import { getCourseWorkouts } from "./getCourseWorkouts";

type WriteUserDataType = {
  userId: string | undefined;
  courseId: string;
  course: CourseType;
};

export async function addCourseUser({
  userId,
  courseId,
  course,
}: WriteUserDataType) {
  let workoutsList: NewWorkoutContentType = {};

  await getCourseWorkouts({ course, workoutsList });

  console.log(workoutsList);

  await set(ref(database, `users/${userId}/courses/${courseId}`), {
    _id: course._id,
    nameEN: course.nameEN,
    nameRU: course.nameRU,
    workouts: workoutsList,
    progressCourse: 0,
  });
}
