"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";

export type RegisterState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values?: {
    username?: string;
    name?: string;
  };
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: NonNullable<RegisterState["errors"]> = {};

  if (!username || username.trim().length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  if (!name || name.trim().length < 1) {
    errors.name = "Name is required";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username.trim()),
  });

  if (existingUser) {
    return {
      errors: { username: "Username is already taken" },
      values: { username, name },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username: username.trim(),
    name: name.trim(),
    passwordHash,
  });

  redirect("/login");
}
