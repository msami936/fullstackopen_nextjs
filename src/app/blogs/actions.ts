"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBlog, likeBlog } from "@/lib/blogs";

export async function createBlogAction(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const author = String(formData.get("author") ?? "");
  const url = String(formData.get("url") ?? "");

  createBlog({ title, author, url });

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
