"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addBlogToReadingList, createBlog, likeBlog } from "@/lib/blogs";

export type CreateBlogState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
  };
  values?: {
    title?: string;
    author?: string;
    url?: string;
  };
};

async function setNotificationCookie(message: string, type = "success") {
  const cookieStore = await cookies();
  cookieStore.set("notification", message, { path: "/", maxAge: 10 });
  cookieStore.set("notificationType", type, { path: "/", maxAge: 10 });
}

export async function createBlogAction(
  _prevState: CreateBlogState,
  formData: FormData,
): Promise<CreateBlogState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: NonNullable<CreateBlogState["errors"]> = {};

  if (!title || title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  }
  if (!author || author.trim().length < 5) {
    errors.author = "Author must be at least 5 characters";
  }
  if (!url || url.trim().length < 5) {
    errors.url = "Url must be at least 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } };
  }

  await createBlog({
    title: title.trim(),
    author: author.trim(),
    url: url.trim(),
    userId: Number(session.user.id),
  });

  revalidatePath("/blogs");
  revalidatePath("/me");
  await setNotificationCookie("Blog created successfully");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  await likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  await setNotificationCookie("Blog liked");
  redirect(`/blogs/${id}`);
}

export async function addToReadingListAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");
  const blogId = Number(id);

  if (Number.isNaN(blogId)) {
    redirect("/blogs");
  }

  await addBlogToReadingList(Number(session.user.id), blogId);

  revalidatePath("/me");
  revalidatePath(`/blogs/${id}`);
  await setNotificationCookie("Added to reading list");
}
