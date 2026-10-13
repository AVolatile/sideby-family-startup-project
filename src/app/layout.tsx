import type { Metadata } from "next";
import { DemoProvider } from "@/lib/DemoProvider";
import "@/styles/globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://sideby-anthony-volatile.lushshore129.chatgpt.site",
  ),
  title: {
    default: "Sideby — Room to grow. A plan to go.",
    template: "%s · Sideby",
  },
  description:
    "A little structure. A lot of room. Explore a fictional family coordination and teen independence product, brand, and campaign by Anthony Volatile.",
  icons: { icon: "/brand/favicon.svg", apple: "/brand/app-icon.svg" },
  openGraph: {
    title: "Sideby — Room to grow. A plan to go.",
    description:
      "Family coordination that makes room for growing independence.",
    images: [{ url: "/brand/og.png", width: 1280, height: 960 }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
