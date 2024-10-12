
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
  console.log("on request side")
  const { selectedOption, topic } = await request.json();
  console.log(selectedOption, topic)
  if (selectedOption =='text'){
      const systemPrompt = `
    You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow the guidelines below to create the flashcards:

    1. Create clear and concise questions for the front of the flashcard. LIMIT THE WORD COUNT TO 30 WORDS PER FRONT OR BACK.
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
    RETURN ONLY THE JSON AND NO OTHER MESSAGES BEFORE AND AFTER THE JSON. 
  `;

  
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
  }
    else if (selectedOption=='pdf') {
      console.log("PDFING");
      print(topic)
      async function extractTextFromPdf(pdfBuffer) {
        try {
          const data = await pdf(pdfBuffer);
          return data.text;
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          throw error;
        }
      }
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(topic);
      const embedding = result.embedding.values;
      console.log(embedding)


      const flashcards = await model.generate({
        input: retrievedDocuments,
        template: 'Create flashcards based on the following content: {{input}}',
      });
      console.log("printing now", flashcards)

      return NextResponse.json(flashcards);
    }
      
    else{
      return NextResponse.json({ error: "You fucked up" }, { status: 500 });

    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from OpenRouter.ai" }, { status: 500 });
  }
}

