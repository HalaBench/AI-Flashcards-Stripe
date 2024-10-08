
import { NextResponse } from "next/server";

export async function POST(request) {
  const { topic } = await request.json();
  console.log("received topic, ", topic)

  const systemPrompt = `
    You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow the guidelines below to create the flashcards:

    1. Create clear and concise questions for the front of the flashcard.
    2. Provide accurate and informative answers for the back of the flashcard.
    3. Ensure that each flashcard focuses on a single concept or piece of information.
    4. Use simple and easy-to-understand language.
    5. Include a variety of question types, such as multiple choice, true/false, and fill-in-the-blank.
    6. Avoid overly complex or ambiguous questions and answers.
    7. When appropriate, use mnemonics or memory aids to help with retention.
    8. Tailor the difficulty of the flashcards to the user's specified preferences.
    9. If given a body of text, extract the most important and relevant information for the flashcards.
    10. Aim to create a balanced set of flashcards that cover all key aspects of the topic or content.
    11. Only generate 10 flashcards.

    Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

    Return in the following JSON format:
    {
      "flashcards": [{
        "front": str,
        "back": str
      }]
    }
    RETURN ONLY THE JSON AND NO OTHER MESSAGES BEFORE AND AFTER THE JSON
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create flashcards for the topic: ${topic}` },
        ],
      })
    });

    const data = await response.json();
    console.log("Data received:", data);
    const flashcards = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from OpenRouter.ai" }, { status: 500 });
  }
}
