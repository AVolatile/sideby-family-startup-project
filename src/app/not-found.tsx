import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <Logo />
      <span className="eyebrow">A LITTLE DETOUR · 404</span>
      <h1>
        This wasn’t
        <br />
        in the plan.
      </h1>
      <p>That page isn’t here. Let’s get you back to a familiar place.</p>
      <ButtonLink href="/">Head home</ButtonLink>
    </main>
  );
}
