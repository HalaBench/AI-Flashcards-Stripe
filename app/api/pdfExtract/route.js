import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai"; // Ensure to import OpenAI correctly

export async function POST(request){

  console.log("MADE IT")

  try{
  const {content} = await request.json();
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY})
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
  const embedText = content
  console.log("embed ", embedText)
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: [embedText],
    encoding_format: 'float',
  })
  console.log("RESONISE HERE ", response)
  const embedding = response.data[0].embedding

  const chunkId = `chunk_${Math.floor(Math.random() * 1e12)}`;

  const metadata = {
    source: "uploaded_pdf",
    snippet: embedText.slice(0, 100), 
    timestamp: new Date().toISOString(), 
  };

  const upsertData = [
    {
      id: chunkId,
      values: embedding,
      metadata: metadata,
    },
  ];
  const index = pc.index('flashcards');
  await index.namespace("ns1").upsert({ vectors: upsertData });

  return NextResponse.json({
    message: "Data successfully upserted",
    upsertedId: chunkId,
  });
} catch (error) {
  console.error("Error upserting data:", error);
  return NextResponse.json({ error: "Failed to upsert data" }, { status: 500 });
}
}