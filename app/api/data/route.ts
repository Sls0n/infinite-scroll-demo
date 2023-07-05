import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    cache: "no-cache",
  });

  const posts = await response.json();

  // Simulating a 1s delay before returning the response
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(posts);
}
