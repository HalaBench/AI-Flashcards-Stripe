'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import Header from '@/app/Components/Header';
import Footer from '@/app/Components/Footer';

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (user) {
        const flashcardsCollection = collection(db, 'flashcards');
        const q = query(flashcardsCollection, where('userId', '==', user.id));
        const querySnapshot = await getDocs(q);
        const userFlashcards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlashcards(userFlashcards);
      }
    };
  
    fetchFlashcards();
  }, [user]);  

  return (
    <div>
      <Header />
      <div className="my-20 h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5">My Flashcards</h1>
        {flashcards.length === 0 ? (
          <p>No flashcards found.</p>
        ) : (
          <ul>
            {flashcards.map((flashcard) => (
              <li key={flashcard.id}>
                <h2 className="text-xl font-semibold mb-2">Flashcard Set</h2>
                <ul>
                  {flashcard.flashcards.map((card, index) => (
                    <li key={index}>
                      <strong>Q:</strong> {card.front}<br />
                      <strong>A:</strong> {card.back}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}
