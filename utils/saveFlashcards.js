// /utils/saveFlashcards.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const saveFlashcards = async (flashcards, user) => {
  try {
    await addDoc(collection(db, 'flashcards'), {
      userId: user.id,
      flashcards: flashcards,
      createdAt: new Date(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default saveFlashcards;
