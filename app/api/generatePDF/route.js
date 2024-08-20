// /app/api/generatePDF/route.js

import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(request) {
  try {
    // Extract PDF file from the request
    const formData = await request.formData();
    const pdfFile = formData.get('pdf');
    
    if (!pdfFile || !(pdfFile instanceof Blob)) {
      throw new Error('No PDF file provided');
    }

    // Convert Blob to Buffer
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

    // Parse the PDF buffer to extract text
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData.text.trim();

    const systemPrompt = `
      You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given pdf content. Follow the guidelines below to create the flashcards:
      ...
    `;

    // Send the PDF content to the OpenRouter API to generate flashcards
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
          { role: "user", content: `Create flashcards for the following text: ${pdfText}` },
        ],
      })
    });

    const data = await response.json();
    const flashcards = JSON.parse(data.choices[0].message.content);
    
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch data from OpenRouter.ai" }, { status: 500 });
  }
}