import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai"; // Ensure to import OpenAI correctly

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle multipart form data
  },
};

export async function POST(request){
  console.log("MADE IT")
  const {pdfData} = await request.json();
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY})
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
  const embedText = pdfData
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: embedText,
    encoding_format: 'float',
  })
  const returnedEmbedding = response.data[0].embedding
  await pc.index('flashcards').namespase("ns1").upsert(returnedEmbedding);
}