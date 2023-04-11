import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAHWOY-zyGTntYWTw7mrbVmRbIBm0LEqo',
  authDomain: 'showzone-c97e1.firebaseapp.com',
  projectId: 'showzone-c97e1',
  storageBucket: 'showzone-c97e1.appspot.com',
  messagingSenderId: '133172770789',
  appId: '1:133172770789:web:e6c5e1fdcde3609638a10c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// para login.js
export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider(); // instancia es una clase q va a devolver un objeto
  const credentials = await signInWithPopup(auth, provider);
  return credentials;
};

// para login.js
export const loginEmail = async (email, password) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials;
};

// para register.js
export const createUser = async (email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  return userCredentials;
};

export const logOutUser = () => signOut(auth);

export {
  onAuthStateChanged,
};
