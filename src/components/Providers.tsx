"use client";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { NotificationProvider } from "./NotificationContext";
import NotificationFromQuery from "./NotificationFromQuery";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>
        <Suspense fallback={null}>
          <NotificationFromQuery />
        </Suspense>
        {children}
      </NotificationProvider>
    </SessionProvider>
  );
}
