import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll";
import { meta } from "@/content/site";
import "lenis/dist/lenis.css";
import "@/styles/webflow.css";
import "@/styles/custom.css";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const bdoGrotesk = localFont({
  src: "./fonts/BDOGrotesk-VF.woff",
  variable: "--font-bdo-grotesk",
  weight: "300 900",
  display: "swap",
});

const robotoMono = localFont({
  src: "./fonts/RobotoMono-VariableFont_wght.woff2",
  variable: "--font-roboto-mono",
  weight: "100 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "website" },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bdoGrotesk.variable} ${robotoMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
