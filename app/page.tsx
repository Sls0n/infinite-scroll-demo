"use client";

import { useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

const posts = [
  {
    id: 1,
    title: "Post 1",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 2,
    title: "Post 2",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 3,
    title: "Post 3",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 4,
    title: "Post 4",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 5,
    title: "Post 5",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 6,
    title: "Post 6",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 7,
    title: "Post 7",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 8,
    title: "Post 8",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 9,
    title: "Post 9",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 10,
    title: "Post 10",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 11,
    title: "Post 11",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 12,
    title: "Post 12",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 13,
    title: "Post 13",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 14,
    title: "Post 14",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 15,
    title: "Post 15",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 16,
    title: "Post 16",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 17,
    title: "Post 17",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
];

const fetchPosts = async (page: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 1000);
  });

  // showing 2 posts per page
  return posts.slice((page - 1) * 2, page * 2);
};

export default function Home() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPosts(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [posts.slice(0, 2)],
        pageParams: [1],
      },
    }
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Infinite scroll</h1>
      <div className="flex flex-col flex-wrap w-full gap-4">
        {data?.pages.flatMap((page) => (
          <div key={page[0].id}>
            {page.map((post) => (
              <div
                key={post.id}
                className="bg-slate-900 rounded-lg shadow-md p-4 mb-4"
              >
                <h2 className="text-lg font-bold mb-2 text-gray-300">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      </div>
    </div>
  );
}
