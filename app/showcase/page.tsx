import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Showcase | Posts",
  description: "A showcase of posts created with the CMS.",
};

export default async function ShowcasePage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-zinc-800 selection:text-white">
      <header className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-between border-b border-zinc-900">
        <div className="font-bold text-xl tracking-tight">Showcase</div>
        <nav className="flex gap-6 text-sm text-zinc-400">
          <Link href="/" className="hover:text-zinc-50 transition-colors">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-zinc-50 transition-colors"
          >
            CMS Dashboard
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 leading-tight">
          Recent Posts
        </h1>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-zinc-500">No published posts found.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs mb-3">
                  <time
                    dateTime={post.createdAt.toISOString()}
                    className="text-zinc-500"
                  >
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-zinc-300 transition-colors">
                    <Link href={`/showcase/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="text-zinc-400">
                      By{" "}
                      <span className="font-medium text-zinc-300">
                        {post.author?.name || "Unknown Author"}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
