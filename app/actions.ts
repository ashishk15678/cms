"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function createPost(data: {
  title: string;
  slug: string;
  content: string;
  published?: boolean;
}) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.create({
    data: {
      ...data,
      published: data.published ?? false,
      authorId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return post;
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
  }
) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/posts/${id}`);
  return updatedPost;
}

export async function deletePost(id: string) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
