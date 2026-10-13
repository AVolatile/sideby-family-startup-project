import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  HowItWorks,
  AudiencePage,
  SafetyPage,
  FeaturesPage,
  ResourcesPage,
  AboutPage,
} from "@/components/marketing/SupportingPages";
import { Pricing } from "@/components/marketing/Pricing";
import { AuthExperience } from "@/components/marketing/AuthExperience";
const routes: Record<string, string> = {
  "how-it-works": "How it works",
  "for-parents": "For parents",
  "for-teens": "For teens",
  features: "Features",
  safety: "Our approach to trust",
  pricing: "Pricing",
  resources: "Field notes",
  about: "About Sideby",
  login: "Explore the demo",
  signup: "Start your family",
};
export function generateStaticParams() {
  return Object.keys(routes).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: routes[page] ?? "Sideby" };
}
export default async function PublicPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pages: Record<string, React.ReactNode> = {
    "how-it-works": <HowItWorks />,
    "for-parents": <AudiencePage />,
    "for-teens": <AudiencePage teen />,
    safety: <SafetyPage />,
    features: <FeaturesPage />,
    pricing: <Pricing />,
    resources: <ResourcesPage />,
    about: <AboutPage />,
    login: <AuthExperience />,
    signup: <AuthExperience signup />,
  };
  if (!pages[page]) notFound();
  return <MarketingShell>{pages[page]}</MarketingShell>;
}
