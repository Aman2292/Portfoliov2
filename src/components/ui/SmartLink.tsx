import Link from "next/link";
import type { ComponentProps } from "react";
import { externalProps } from "@/lib/utils";

/**
 * Internal routes ("/shopify", "/#about") go through next/link for client-side navigation;
 * in-page anchors, mailto/tel and off-site URLs stay plain <a> tags.
 */
export function SmartLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...externalProps(href)} {...props} />;
}
