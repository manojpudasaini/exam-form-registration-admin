import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDcyQH6qTHt54ao42rwlGKrTT8rqu3qWW4",
  authDomain: "exam-form-9286a.firebaseapp.com",
  projectId: "exam-form-9286a",
  storageBucket: "exam-form-9286a.appspot.com",
  messagingSenderId: "592511133331",
  appId: "1:592511133331:web:f2affb7859ff0c1b9a0f66",
  measurementId: "G-YRDZ3H8Q4T",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { firebase };
