import Link from "next/link";
export function Symbol({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 9v17c0 8 5 13 13 13"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M37 39V22c0-8-5-13-13-13"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Logo({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sideby home"
      className={`logo ${light ? "logo-light" : ""}`}
    >
      <Symbol />
      {!compact && (
        <span>
          sideby<span className="logo-dot">.</span>
        </span>
      )}
    </Link>
  );
}
export function BrandPath({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-path ${className}`}
      viewBox="0 0 400 340"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-30 80h190c120 0 120 160 0 160H20"
        stroke="currentColor"
        strokeWidth="48"
        strokeLinecap="round"
      />
      <path
        d="M430 310H240c-120 0-120-160 0-160h140"
        stroke="currentColor"
        strokeWidth="48"
        strokeLinecap="round"
      />
    </svg>
  );
}
