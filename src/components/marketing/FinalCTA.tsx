import { BrandPath } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Primitives";
export function FinalCTA() {
  return (
    <section className="final-cta">
      <BrandPath />
      <span className="eyebrow">
        A LITTLE LESS BACK-AND-FORTH. A LITTLE MORE GO.
      </span>
      <h2>
        Make room for
        <br />
        your next Tuesday.
      </h2>
      <ButtonLink href="/signup">Start your family</ButtonLink>
      <p>Explore the concept. Try a shared plan.</p>
    </section>
  );
}
