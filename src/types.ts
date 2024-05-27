export type CourseType = {
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  workouts: string[];
};

export type SignUpUserDataType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignInUserDataType = {
  email: string;
  password: string;
};

export type ChangePasswordType = {
  password: string;
  repeatPassword: string;
};

export type ButtonType = {
  title?: string;
  onClick?: () => void;
  type?: "submit";
};

export type UserWorkoutType = [
  string,
  {
    name: string;
    video: string;
    _id: string;
    progressWorkout: number;
    exercises: ExerciseType[];
  }
];

export type ExerciseType = {
  name: string;
  quantity: number;
  curProgress: number;
};

export type WorkoutType = {
  name: string;
  video: string;
  _id: string;
  exercises: ExerciseType[];
  progressWorkout: number;
};

export type NewWorkoutContentType = {
  [key: string]: {
    _id: string;
    name: string;
    progressWorkout: number;
    video: string;
    exercises: ExerciseType[];
  };
};