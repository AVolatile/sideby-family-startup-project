import { notFound } from "next/navigation";
import { productNav } from "@/data/content";
import { Today } from "@/components/product/Today";
import { Calendar } from "@/components/product/Calendar";
import { Responsibilities } from "@/components/product/Responsibilities";
import { CheckIns } from "@/components/product/CheckIns";
import { Rides } from "@/components/product/Rides";
import { Permissions } from "@/components/product/Permissions";
import { Goals } from "@/components/product/Goals";
import {
  Updates,
  Milestones,
  ImportantInfo,
  Notifications,
  Profiles,
} from "@/components/product/FamilyPages";
const pages: Record<string, React.ComponentType> = {
  today: Today,
  calendar: Calendar,
  responsibilities: Responsibilities,
  "check-ins": CheckIns,
  rides: Rides,
  permissions: Permissions,
  goals: Goals,
  updates: Updates,
  milestones: Milestones,
  info: ImportantInfo,
  notifications: Notifications,
  profiles: Profiles,
};
export function generateStaticParams() {
  return productNav.map((n) => ({ module: n.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  return {
    title: productNav.find((n) => n.slug === module)?.label ?? "Family demo",
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const Page = pages[module];
  if (!Page) notFound();
  return <Page />;
}
