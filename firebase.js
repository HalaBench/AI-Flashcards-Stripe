import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjcYkl0jfYN8xigU8LypaSRrtLGVB7Tmo",
  authDomain: "ai-flashcards-stripe.firebaseapp.com",
  projectId: "ai-flashcards-stripe",
  storageBucket: "ai-flashcards-stripe.appspot.com",
  messagingSenderId: "267185403691",
  appId: "1:267185403691:web:437e824cc45942a1d6b76e",
  measurementId: "G-V0ZR4WY4TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);