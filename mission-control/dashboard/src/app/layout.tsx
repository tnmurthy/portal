import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Control | Agentic OS",
  description: "Real-time observability for autonomous agent squads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
