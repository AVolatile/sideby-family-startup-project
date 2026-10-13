import type { CSSProperties } from "react";
import { iconPaths as paths } from "@/data/icons";

export function Icon({
  name,
  size = 22,
  className = "",
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={paths[name] ?? paths.spark} />
    </svg>
  );
}
export const iconNames = [
  "calendar",
  "ride",
  "pin",
  "flag",
  "key",
  "check",
  "family",
  "message",
  "shield",
  "path",
];
