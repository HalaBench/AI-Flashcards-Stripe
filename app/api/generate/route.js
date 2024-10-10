
{/*import { NextResponse } from 'next/server'

// The system prompt that will be used to generate the flashcards
const systemPrompt = `
  You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow the guidelines below to create the flashcards:

  1. Create clear and concise questions for the front of the flashcard.
  2. Provide accurate and informative answers for the back of the flashcard.
  3. Ensure that each flashcard focuses on a single concept or peice of information.
  4. Use simple and easy-to-understand language.
  5. Include a variety of question types, such as multiple choice, true/false, and fill-in-the-blank.
  6. Avoid overly complex or ambiguous questions phrasing in both questions and answers.
  7. When appropriate, use mnemonics or memory aids to help with retention.
  8. Tailor the difficulty of the flashcards to the user's specified preferences.
  9. If given a body of text, extract the most important and relevant information for the flashcards.
  10. Aim to create a balanced set of flashcards that cover all key aspects of the topic or content.
  11. Only generate 10 flashcards.

  Remember, the goal is to faciliate effective learning and retention of information through these flashcards.

  Return in the following JSON format:
  {
    "flashcards": [{
      "front": str,
      "back": str
      }]
  }
`

export async function POST(req) {
  const openai = new OpenAI()
  const data = await req.text()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
  })

  console.log(completion.choices[0].message.content)

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.choices[0].message.content)

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards)
}*/}
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function run(text) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
//     const result = await model.embedContent(text);
//     return result.embedding.values;
//   } catch (error) {
//     console.error("Error generating embedding:", error);
//     throw error;
//   }
// }

// async function upsertToPinecone(embeddingValues) {
//   try {
//     const pinecone = new PineconeClient();
//     await pinecone.init({
//       apiKey: process.env.PINECONE_API_KEY,
//       environment: 'us-east-1',
//     });

//     const index = pinecone.Index('ai-flashcards');
//     const upsertRequest = {
//       vectors: embeddingValues.map((embedding, idx) => ({
//         id: idx.toString(),
//         values: embedding,
//       })),
//     };

//     await index.upsert(upsertRequest);
//   } catch (error) {
//     console.error("Error upserting to Pinecone:", error);
//     throw error;
//   }
// }
// async function handleGenerateFlashcards(text) {
//   try {
//     const embeddingValues = await run(text);
//     await upsertToPinecone(embeddingValues);

//     // Continue with flashcard generation from retrieved documents...
//     console.log("Flashcards generated");
//   } catch (error) {
//     console.error("Error in generating flashcards:", error);
//   }
// }
// handleGenerateFlashcards("The fox jumps over the green bush")




// const queryEmbedding = await model.embeddings({
//   input: 'what does the fox do?',
// });

// const queryResponse = await index.query({
//   vector: queryEmbedding[0],
//   topK: 3,
//   includeValues: true,
// });

// const retrievedDocuments = queryResponse.matches.map(match => match.metadata.content);

// // Generate flashcards based on retrieved documents
// const flashcards = await model.generate({
//   input: retrievedDocuments,
//   template: 'Create flashcards based on the following content: {{input}}',
// });

// console.log(flashcards);



// export default async function handler(req, res) {
//   const { topic } = req.body;

//   if (!topic) {
//     return res.status(400).json({ error: 'Topic is required' });
//   }

//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
//     const result = await model.embedContent(topic);
//     const embedding = result.embedding.values;

//     const pinecone = new PineconeClient();
//     await pinecone.init({
//       apiKey: process.env.PINECONE_API_KEY,
//       environment: 'us-east-1'
//     });

//     const index = pinecone.Index('ai-flashcards');
//     const upsertRequest = {
//       vectors: embedding.map((value, idx) => ({
//         id: idx,
//         values: value,
//       })),
//     };
//     await index.upsert(upsertRequest);

//     const queryEmbedding = await model.embeddings({
//       input: 'what does the fox do?',
//     });

//     const queryResponse = await index.query({
//       vector: queryEmbedding[0],
//       topK: 3,
//       includeValues: true,
//     });

//     const retrievedDocuments = queryResponse.matches.map(match => match.metadata.content);

//     const flashcards = await model.generate({
//       input: retrievedDocuments,
//       template: 'Create flashcards based on the following content: {{input}}',
//     });

//     res.status(200).json({ flashcards });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to generate flashcards' });
//   }
// }

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

      const pc = new Pinecone({ apiKey: "b72ccca1-153b-4c99-9e72-124a9c98f952" });

      const index = pc.index("pdfupload");
      const pinecone = new PineconeClient();
      // Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

      //COMMENTED HERE
      // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      //   pineconeIndex,
      //   // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
      //   maxConcurrency: 5,
      //   // You can pass a namespace here too
      //   // namespace: "foo",
      // });

      const index1 = pc.index('ai-flashcards');
      console.log("WEKFDLSJKLFSJKL")
      await index1.namespace('ns1').upsert([
        {
           id: 'vec1', 
           values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
           metadata: { genre: 'drama' }
        },
        {
           id: 'vec2', 
           values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
           metadata: { genre: 'action' }
        },
        {
           id: 'vec3', 
           values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
           metadata: { genre: 'drama' }
        },
        {
           id: 'vec4', 
           values: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
           metadata: { genre: 'action' }
        }
      ]);
      console.log("WEKFDLSJKLFSJKL")
      await index1.namespace('ns1').query({
        topK: 2,
        vector: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
        includeValues: true,
        includeMetadata: true,
        filter: { genre: { '$eq': 'action' }}
      });

      console.log("WEKFDLSJKLFSJKL")
      const upsertRequest = {
        vectors: embedding.map((value, idx) => ({
          id: idx.toString(),
          values: value,
        })),
      };
      await index1.upsert(upsertRequest);

      const queryEmbedding = await model.embeddings({
        input: 'what does the fox do?',
      });

      const queryResponse = await index1.query({
        vector: queryEmbedding[0],
        topK: 3,
        includeValues: true,
      });

      const retrievedDocuments = queryResponse.matches.map(match => match.metadata.content);

      const flashcards = await model.generate({
        input: retrievedDocuments,
        template: 'Create flashcards based on the following content: {{input}}',
      });

      return NextResponse.json(flashcards);
    }
      
    else{
      return NextResponse.json({ error: "You fucked up" }, { status: 500 });

    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from OpenRouter.ai" }, { status: 500 });
  }
}

