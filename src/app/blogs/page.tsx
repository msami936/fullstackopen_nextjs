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
      <h2>Blogs</h2>
      <p>
        <Link href="/blogs/new">create new</Link>
      </p>

      <form style={{ marginBottom: 16 }}>
        <label>
          filter
          <input
            name="filter"
            defaultValue={filter}
            style={{ marginLeft: 8, marginRight: 8 }}
          />
        </label>
        <button type="submit">search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ marginBottom: 12 }}>
            <div>
              <Link href={`/blogs/${blog.id}`}>
                <strong>{blog.title}</strong>
              </Link>{" "}
              by {blog.author}
            </div>
            <div>likes: {blog.likes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
