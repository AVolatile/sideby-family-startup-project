import { MarketingShell } from "@/components/marketing/MarketingShell";
import { CampaignStudio } from "@/components/brand/CampaignStudio";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Campaign studio" };
export default function Campaign() {
  return (
    <MarketingShell>
      <CampaignStudio />
    </MarketingShell>
  );
}
