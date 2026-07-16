"use server";

import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { readingList, users } from "@/db/schema";

async function setNotificationCookie(message: string, type = "success") {
  const cookieStore = await cookies();
  cookieStore.set("notification", message, { path: "/", maxAge: 10 });
  cookieStore.set("notificationType", type, { path: "/", maxAge: 10 });
}

export async function generateApiToken() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const token = randomUUID();

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, Number(session.user.id)));

  revalidatePath("/me", "page");
  return token;
}

export async function markReadingListItemAsRead(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const itemId = Number(formData.get("id"));
  if (Number.isNaN(itemId)) {
    redirect("/me");
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, itemId),
        eq(readingList.userId, Number(session.user.id)),
      ),
    );

  revalidatePath("/me");
  await setNotificationCookie("Marked as read");
  redirect("/me");
}
