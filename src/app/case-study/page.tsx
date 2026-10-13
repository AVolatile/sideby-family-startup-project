import { MarketingShell } from "@/components/marketing/MarketingShell";
import { CaseStudy } from "@/components/brand/CaseStudy";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Case study · Anthony Volatile" };
export default function Case() {
  return (
    <MarketingShell>
      <CaseStudy />
    </MarketingShell>
  );
}
