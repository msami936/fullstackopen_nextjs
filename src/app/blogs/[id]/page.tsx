import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBlog, isBlogInReadingList } from "@/lib/blogs";
import { addToReadingListAction, likeBlogAction } from "../actions";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const isOwnBlog = userId !== null && blog.userId === userId;
  const alreadyInReadingList =
    userId !== null ? await isBlogInReadingList(userId, blog.id) : false;
  const showAddToReadingList =
    userId !== null && !isOwnBlog && !alreadyInReadingList;

  return (
    <article
      data-testid="blog-detail"
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h1
        data-testid="blog-title"
        className="text-3xl font-bold tracking-tight text-slate-900"
      >
        {blog.title}
      </h1>
      <p data-testid="blog-author" className="mt-1 text-slate-500">
        by {blog.author}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-700">likes: {blog.likes}</span>
        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            like
          </button>
        </form>
        {showAddToReadingList && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
            >
              add to reading list
            </button>
          </form>
        )}
        {alreadyInReadingList && !isOwnBlog && (
          <span className="text-sm italic text-slate-500">
            already in reading list
          </span>
        )}
      </div>

      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-600 underline hover:text-blue-800"
      >
        {blog.url}
      </a>
    </article>
  );
}
