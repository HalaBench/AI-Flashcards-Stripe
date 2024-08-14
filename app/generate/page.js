'use client';

import { useState } from 'react';

export default function Generate() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      console.log('API Response:', data);  // Log the entire API response

      if (response.ok) {
        const message = data.choices[0]?.message?.content;
        console.log('Message Content:', message);

        // Extract the JSON part of the message content
        const jsonStartIndex = message.indexOf('{');
        const jsonEndIndex = message.lastIndexOf('}') + 1;

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          const jsonString = message.slice(jsonStartIndex, jsonEndIndex);
          console.log('Extracted JSON:', jsonString);

          try {
            const parsedMessage = JSON.parse(jsonString);
            console.log('Parsed Flashcards:', parsedMessage.flashcards);
            setFlashcards(parsedMessage.flashcards || []);
          } catch (error) {
            console.error('Failed to parse the flashcards:', error);
            setError('Failed to parse the flashcards');
          }
        } else {
          setError('Failed to extract JSON from the response');
        }
      } else {
        setError(data.error || 'Failed to generate flashcards');
      }
    } catch (err) {
      setError('Failed to fetch data from the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Generate Flashcards</h1>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="mt-8 w-full max-w-lg">
        {flashcards.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Generated Flashcards</h2>
            <ul className="space-y-4">
              {flashcards.map((card, index) => (
                <li
                  key={index}
                  className="bg-white p-4 border border-gray-200 rounded shadow-sm"
                >
                  <p className="font-semibold">Q: {card.front}</p>
                  <p className="mt-2">A: {card.back}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {flashcards.length === 0 && !loading && <p>No flashcards generated yet.</p>}
      </div>
    </div>
  );
}
