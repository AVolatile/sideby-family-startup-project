import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/content";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Primitives";
export function generateStaticParams() {
  return articles.map((a) => ({ article: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  return {
    title: articles.find((a) => a.slug === article)?.title ?? "Field notes",
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const a = articles.find((a) => a.slug === article);
  if (!a) notFound();
  return (
    <MarketingShell>
      <article className="article-page">
        <Link href="/resources" className="text-link">
          <Icon name="arrow" className="rotate" size={18} />
          All field notes
        </Link>
        <span className="eyebrow">
          {a.tag} · {a.read} · Sideby editorial concept
        </span>
        <h1>{a.title}</h1>
        <p className="article-deck">{a.description}</p>
        <div className={`article-art bg-${a.color}`}>
          <Icon
            name={
              a.slug === "the-sunday-ten"
                ? "calendar"
                : a.slug === "a-first-solo-plan"
                  ? "path"
                  : "message"
            }
            size={90}
          />
          <span>
            A LITTLE STRUCTURE.
            <br />A LOT OF ROOM.
          </span>
        </div>
        {a.sections.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
        <aside className="article-cta">
          <h3>Give the conversation a shared place.</h3>
          <p>
            Try the Bennett family demo and see one practical plan come
            together.
          </p>
          <ButtonLink href="/app">Explore Sideby</ButtonLink>
        </aside>
      </article>
    </MarketingShell>
  );
}
