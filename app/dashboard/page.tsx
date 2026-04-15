"use client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Edit2 } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

export default async function DashboardPage() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  const session = (await authClient.getSession()).data;
  if (!session?.user) {
    redirect("/auth");
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h2 className="mt-6 text-xl font-semibold">No posts created</h2>
              <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-zinc-500 dark:text-zinc-400">
                You don't have any posts yet. Start creating content for your
                portfolio.
              </p>
              <Link
                href="/dashboard/posts/new"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
              >
                Create Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="space-y-1">
                  <Link
                    href={`/dashboard/posts/${post.id}`}
                    className="font-medium text-lg hover:underline decoration-zinc-400 underline-offset-4"
                  >
                    {post.title || "Untitled Post"}
                  </Link>
                  <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 space-x-2">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        post.published
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/dashboard/posts/${post.id}`}
                    className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
