import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const saveFlashcards = async (flashcards) => {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), {
      flashcards: flashcards,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default saveFlashcards;
