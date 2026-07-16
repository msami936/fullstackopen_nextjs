import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Notification from "@/components/Notification";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Providers>
          <Navigation />
          <main className="mx-auto max-w-3xl px-4 py-6">
            <Notification />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
