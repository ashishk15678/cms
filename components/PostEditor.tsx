"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Editor from "./Editor";
import { createPost, updatePost } from "@/app/actions";
import { Save, Globe } from "lucide-react";

interface PostEditorProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
  };
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Auto-generate slug only if it's a new post and the user hasn't manually edited the slug much
    if (!post && (slug === "" || slug === generateSlug(title))) {
      setSlug(generateSlug(newTitle));
    }
  };

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSave = async (publish: boolean) => {
    if (!title || !slug) {
      alert("Title and slug are required.");
      return;
    }

    startTransition(async () => {
      try {
        if (post) {
          await updatePost(post.id, {
            title,
            slug,
            content,
            published: publish,
          });
        } else {
          const newPost = await createPost({
            title,
            slug,
            content,
            published: publish,
          });
          router.replace(`/dashboard/posts/${newPost.id}`);
        }
        router.refresh();
      } catch (error) {
        console.error("Failed to save post:", error);
        alert("Failed to save post. Check console for details.");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Back
          </button>
          <span className="text-sm font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-600 dark:text-zinc-300">
            {post ? (post.published ? "Published" : "Draft") : "New Draft"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            <Globe className="w-4 h-4" />
            {isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:ring-0 p-0"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>/posts/</span>
          <input
            type="text"
            placeholder="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 px-2 py-1 rounded transition-colors focus:ring-0"
          />
        </div>
      </div>

      <div className="min-h-[500px]">
        <Editor content={content} onChange={setContent} />
      </div>
    </div>
  );
}
