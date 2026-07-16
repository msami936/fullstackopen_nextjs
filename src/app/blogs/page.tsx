import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

type BlogsPageProps = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { filter = "" } = await searchParams;
  const filterTerm = filter.trim().toLowerCase();

  const blogs = (await getBlogs()).filter((blog) =>
    blog.title.toLowerCase().includes(filterTerm),
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Blogs
        </h1>
        <Link
          href="/blogs/new"
          className="rounded-md bg-teal-700 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800"
        >
          create new
        </Link>
      </div>

      <form className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          filter
          <input
            name="filter"
            data-testid="filter-input"
            defaultValue={filter}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </label>
        <button
          type="submit"
          data-testid="search-button"
          className="rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200"
        >
          search
        </button>
      </form>

      <ul
        data-testid="blogs-list"
        className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      >
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
            >
              <span className="font-medium text-teal-800 hover:underline">
                {blog.title}
              </span>
              <span className="text-sm text-slate-500">{blog.likes} likes</span>
            </Link>
          </li>
        ))}
        {blogs.length === 0 && (
          <li className="px-4 py-6 text-sm text-slate-500">No blogs found.</li>
        )}
      </ul>
    </div>
  );
}
