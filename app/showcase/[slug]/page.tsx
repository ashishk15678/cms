import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ShowcasePostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ShowcasePostPage({ params }: ShowcasePostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-zinc-800 selection:text-white">
      <header className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-between border-b border-zinc-900">
        <Link
          href="/showcase"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Showcase
        </Link>
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <article>
          <header className="mb-12 border-b border-zinc-900 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-zinc-100">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <time dateTime={post.createdAt.toISOString()}>
                {formattedDate}
              </time>
              <span>•</span>
              <span>By {post.author?.name || "Unknown Author"}</span>
            </div>
          </header>

          <div
            className="prose prose-invert prose-zinc max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-xl prose-img:border prose-img:border-zinc-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}
