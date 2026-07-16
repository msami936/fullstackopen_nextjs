"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useNotification } from "./NotificationContext";

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

export default function NotificationFromQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    const messageFromQuery = searchParams.get("notification");
    const typeParam = searchParams.get("notificationType");
    const messageFromCookie = getCookie("notification");
    const typeFromCookie = getCookie("notificationType");

    const message = messageFromQuery ?? messageFromCookie;
    const type =
      (typeParam ?? typeFromCookie) === "error" ? "error" : "success";

    if (!message) {
      return;
    }

    notify(message, type);

    if (messageFromCookie) {
      clearCookie("notification");
      clearCookie("notificationType");
    }

    if (messageFromQuery) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("notification");
      params.delete("notificationType");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [searchParams, pathname, router, notify]);

  return null;
}
