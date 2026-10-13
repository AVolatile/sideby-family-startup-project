import { AppShell } from "@/components/product/AppShell";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Bennett family demo",
  robots: { index: false, follow: false },
};
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
