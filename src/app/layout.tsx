import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { ProgressiveBlur } from "@/components/layout/ProgressiveBlur";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { SmoothScroll } from "@/components/SmoothScroll";
import { brand, meta } from "@/content/site";
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
  title: { default: meta.title, template: `%s — ${brand.name}` },
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "website" },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export const viewport: Viewport = {
  themeColor: "#eef1f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bdoGrotesk.variable} ${robotoMono.variable}`}>
      <body>
        <SmoothScroll>
          <Preloader />
          <div className="page-wrapper">
            <Navbar />
            <ProgressiveBlur />
            <main className="main-wrapper">{children}</main>
            <Footer />
          </div>
          <ScrollAnimations />
        </SmoothScroll>
      </body>
    </html>
  );
}
