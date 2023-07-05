import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a 1000ms delay
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?&_limit=20`,
    {
      cache: "no-cache",
    }
  );

  const posts = await response.json();

  return NextResponse.json(posts);
}
