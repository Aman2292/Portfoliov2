import { brand } from "@/content/site";
import { cx } from "@/lib/utils";

/** Your name set as a logo (replaces the template's image logo). */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cx("wordmark", className)}>{brand.name}</span>;
}
