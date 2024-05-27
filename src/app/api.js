import { app } from './firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const auth = getAuth(app);
export async function signUp({ email, password }) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e.code;
  }

  return { result, error };
}

export async function signIn({ email, password }) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e.code;
  }

  return { result, 
    error 
    };
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (e) {
    error = e.code;
  }
}
