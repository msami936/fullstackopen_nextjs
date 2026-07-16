import { notFound } from "next/navigation";
import { getBlog } from "@/lib/blogs";
import { likeBlogAction } from "../actions";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>author: {blog.author}</div>
      <div>
        url:{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>likes: {blog.likes}</div>
      <form action={likeBlogAction} style={{ marginTop: 12 }}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  );
}
