"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  src: string;
  poster: string;
  /** Don't fetch the video until it scrolls near the viewport. */
  lazy?: boolean;
  children?: ReactNode;
};

/** Muted looping background video that only plays while on screen (and never with reduced motion). */
export function BackgroundVideo({ src, poster, lazy, className, children, ...rest }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx(className, "w-background-video w-background-video-atom")} {...rest}>
      <video
        ref={videoRef}
        autoPlay={!lazy}
        muted
        loop
        playsInline
        preload={lazy ? "none" : "auto"}
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      {children}
    </div>
  );
}
