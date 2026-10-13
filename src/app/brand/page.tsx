import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { BrandSystem } from "@/components/brand/BrandSystem";
export const metadata: Metadata = { title: "The brand system" };
export default function Brand() {
  return (
    <MarketingShell>
      <BrandSystem />
    </MarketingShell>
  );
}
