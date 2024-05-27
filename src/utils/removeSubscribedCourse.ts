import { database } from '@/app/firebase';
import { getAuth } from 'firebase/auth';
import { ref, remove } from 'firebase/database';

const auth = getAuth();

export const removeSubscribedCourse = async (courseId: string) => {
  await remove(
    ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}`),
  );
};
