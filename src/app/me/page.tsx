import Link from "next/link";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getReadingListForUser } from "@/lib/blogs";
import { markReadingListItemAsRead } from "./actions";
import { ApiTokenSection } from "./ApiTokenSection";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    redirect("/login");
  }

  const readingListItems = await getReadingListForUser(userId);
  const unreadItems = readingListItems.filter((item) => !item.read);
  const readItems = readingListItems.filter((item) => item.read);

  return (
    <div
      data-testid="user-profile"
      className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="mb-6 text-3xl font-bold text-slate-900">My Profile</h1>

      <div className="space-y-2 text-slate-800">
        <p data-testid="user-name">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p data-testid="user-username">
          <span className="font-bold">Username:</span> {user.username}
        </p>
      </div>

      <hr className="my-8 border-slate-200" />

      <section data-testid="reading-list-section">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Reading List</h2>

        {readingListItems.length === 0 ? (
          <p
            data-testid="empty-reading-list"
            className="text-sm italic text-slate-500"
          >
            Your reading list is empty.
          </p>
        ) : (
          <div className="space-y-6">
            <section data-testid="unread-section">
              <h3 className="mb-3 text-base font-bold text-slate-800">
                Unread ({unreadItems.length})
              </h3>
              {unreadItems.length === 0 ? (
                <p
                  data-testid="no-unread-blogs"
                  className="text-sm italic text-slate-500"
                >
                  No unread blogs.
                </p>
              ) : (
                <ul className="space-y-2">
                  {unreadItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-md bg-yellow-50 px-4 py-3"
                    >
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {item.blog.title}
                      </Link>
                      <form action={markReadingListItemAsRead}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${item.id}`}
                          className="shrink-0 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section data-testid="read-section">
              <h3 className="mb-3 text-base font-bold text-slate-800">
                Read ({readItems.length})
              </h3>
              {readItems.length === 0 ? (
                <p className="text-sm italic text-slate-500">
                  No read blogs yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {readItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-md bg-teal-50 px-4 py-3"
                    >
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {item.blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </section>

      <hr className="my-8 border-slate-200" />

      <ApiTokenSection initialToken={user.token} />
    </div>
  );
}
