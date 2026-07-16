import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";

const linkClass =
  "rounded px-2 py-1 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white";

const Navigation = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-slate-900 shadow-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-3">
        <Link href="/" className={`${linkClass} font-semibold`}>
          home
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Link href="/blogs" className={linkClass}>
            blogs
          </Link>
          <Link href="/users" className={linkClass}>
            users
          </Link>
          {session ? (
            <>
              <Link href="/blogs/new" className={linkClass}>
                create new
              </Link>
              <Link
                href="/me"
                className="rounded px-2 py-1 text-sm font-medium text-white underline decoration-2 underline-offset-4"
              >
                me
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
                login
              </Link>
              <Link
                href="/register"
                className="rounded bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
