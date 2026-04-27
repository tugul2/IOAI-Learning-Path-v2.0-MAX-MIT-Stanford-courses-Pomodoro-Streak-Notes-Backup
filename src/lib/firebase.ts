import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDX28igZ7WOwvEt75McMjMRhrA8IitVns4",
  authDomain: "gereg-intel.firebaseapp.com",
  projectId: "gereg-intel",
  storageBucket: "gereg-intel.firebasestorage.app",
  messagingSenderId: "1085136399923",
  appId: "1:1085136399923:web:46ed88600773a6db6f3d46"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export interface ProgressData {
  completed: string[];
  notes: Record<string, string>;
  pomoSessions: number;
  streak: number;
  streakDate: string;
  lastSaved: string;
}

export async function saveProgress(data: Omit<ProgressData, 'lastSaved'>) {
  const user = auth.currentUser;
  if (!user) return;
  await setDoc(doc(db, 'progress', user.uid), {
    ...data,
    lastSaved: new Date().toISOString()
  });
}

export async function loadProgress(): Promise<ProgressData | null> {
  const user = auth.currentUser;
  if (!user) return null;
  const snap = await getDoc(doc(db, 'progress', user.uid));
  return snap.exists() ? (snap.data() as ProgressData) : null;
}
