import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, type Blog } from "@/db/schema";

export type { Blog };

export const getBlogs = async (): Promise<Blog[]> => {
  return db.select().from(blogs).orderBy(desc(blogs.likes), asc(blogs.id));
};

export const getBlog = async (id: string): Promise<Blog | undefined> => {
  const blogId = Number(id);
  if (Number.isNaN(blogId)) {
    return undefined;
  }

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, blogId));
  return blog;
};

export const createBlog = async (
  blog: Omit<Blog, "id" | "likes">,
): Promise<Blog> => {
  const [newBlog] = await db
    .insert(blogs)
    .values({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0,
    })
    .returning();

  return newBlog;
};

export const likeBlog = async (id: string): Promise<Blog | undefined> => {
  const blogId = Number(id);
  if (Number.isNaN(blogId)) {
    return undefined;
  }

  const [updatedBlog] = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, blogId))
    .returning();

  return updatedBlog;
};
