import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?&_limit=30`,
    {
      cache: "no-cache",
    }
  );

  const posts = await response.json();

  return NextResponse.json(posts);
}
