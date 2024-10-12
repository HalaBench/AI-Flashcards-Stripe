import {NextResponse} from "next/server";

export async function POST(request) {
  try{
    console.log("pdf Extract")
    const output = await request
    console.log("pdf received ", output)
    return NextResponse.json(output)
  }
  catch (error){
    console.log("api error", error)
    return NextResponse.json({error:"mane"})
  }
}