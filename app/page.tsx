"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async (page: number) => {
  const res = await fetch("/api/data");

  const posts = await res.json();

  // showing 2 posts per page
  return posts.slice((page - 1) * 2, page * 2);
};

export default function Home() {
  const lastPostRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef?.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["posts"],
      async ({ pageParam = 1 }) => {
        const response = await fetchPosts(pageParam);
        return response;
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage?.length < 2) {
            return undefined;
          }

          return allPages.length + 1;
        },
        initialData: {
          pages: [
            [
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
            ],
          ],
          pageParams: [1],
        },
      }
    );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
    console.log(hasNextPage);
  }, [entry, hasNextPage]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-4 p-4 text-slate-300">
        Scroll down to load more &darr;
      </h1>
      <div className="flex flex-col flex-wrap w-full gap-4 p-4">
        {_posts?.map((post, index) => {
          if (index === _posts.length - 1) {
            return (
              <div
                ref={ref}
                key={post.id}
                className="bg-gray-900 p-16 rounded-lg shadow"
              >
                <h2 className="text-5xl font-bold text-slate-300 mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-3xl">{post.body}</p>
              </div>
            );
          }
          return (
            <div key={post.id} className="bg-gray-900 p-16 rounded-lg shadow">
              <h2 className="text-5xl font-bold text-slate-300 mb-2">
                {post.title}
              </h2>
              <p className="text-slate-500 text-3xl">{post.body}</p>
            </div>
          );
        })}
      </div>
      <div>
        <div
          onClick={() => fetchNextPage()}
          className="text-white font-bold rounded mt-4 p-4"
        >
          {hasNextPage ? (
            <div
              onClick={() => fetchNextPage()}
              className="text-white font-bold rounded mt-4 p-4"
            >
              {isFetchingNextPage ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <span>Load more</span>
              )}
            </div>
          ) : (
            <div className="text-white font-bold rounded mt-4 p-4">
              End of list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
