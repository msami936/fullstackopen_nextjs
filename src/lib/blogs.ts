import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList, type Blog } from "@/db/schema";

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
  blog: Omit<Blog, "id" | "likes" | "userId"> & { userId?: number | null },
): Promise<Blog> => {
  const [newBlog] = await db
    .insert(blogs)
    .values({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0,
      userId: blog.userId ?? null,
    })
    .returning();

  if (blog.userId) {
    await db.insert(readingList).values({
      userId: blog.userId,
      blogId: newBlog.id,
      read: false,
    });
  }

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

export const isBlogInReadingList = async (
  userId: number,
  blogId: number,
): Promise<boolean> => {
  const [item] = await db
    .select()
    .from(readingList)
    .where(
      and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
    );

  return Boolean(item);
};

export const addBlogToReadingList = async (userId: number, blogId: number) => {
  const alreadyAdded = await isBlogInReadingList(userId, blogId);
  if (alreadyAdded) {
    return;
  }

  await db.insert(readingList).values({
    userId,
    blogId,
    read: false,
  });
};

export const getReadingListForUser = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
    orderBy: [desc(readingList.id)],
  });
};
