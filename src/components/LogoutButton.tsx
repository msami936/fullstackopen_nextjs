"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      logout
    </button>
  );
};
