import PostEditor from "@/components/PostEditor";

export const metadata = {
  title: "New Post | CMS",
  description: "Create a new post",
};

export default function NewPostPage() {
  return (
    <div className="w-full h-full">
      <PostEditor />
    </div>
  );
}
