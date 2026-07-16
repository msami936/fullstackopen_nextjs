import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User } from "@/db/schema";

export type { User };

export const getUsers = async (): Promise<User[]> => {
  return db.select().from(users).orderBy(users.name);
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
};
