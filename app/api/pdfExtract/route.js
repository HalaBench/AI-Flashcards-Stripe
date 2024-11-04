import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle multipart form data
  },
};

export async function POST(request){
  const {pdfData} = await request.json();
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY})
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
  const embedText = "hello"
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: embedText,
    encoding_format: 'float',
  })
  const returnedEmbedding = esponse.data[0].embedding
}