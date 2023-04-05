// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAHWOY-zyGTntYWTw7mrbVmRbIBm0LEqo",
  authDomain: "showzone-c97e1.firebaseapp.com",
  projectId: "showzone-c97e1",
  storageBucket: "showzone-c97e1.appspot.com",
  messagingSenderId: "133172770789",
  appId: "1:133172770789:web:e6c5e1fdcde3609638a10c"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);