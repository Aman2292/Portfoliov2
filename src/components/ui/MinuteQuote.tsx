"use client";

import { useSyncExternalStore } from "react";
import { screenQuotes as quotes } from "@/content/site";
import { cx } from "@/lib/utils";

const MINUTE = 60_000;

// Ticks on each new minute of the real clock, so every screen on the page (the device on the page and
// its full-screen copy) shows the same quote and they all change together.
function subscribe(onTick: () => void) {
  let interval: number | undefined;
  const timeout = window.setTimeout(() => {
    onTick();
    interval = window.setInterval(onTick, MINUTE);
  }, MINUTE - (Date.now() % MINUTE));
  return () => {
    window.clearTimeout(timeout);
    window.clearInterval(interval);
  };
}
const currentMinute = () => Math.floor(Date.now() / MINUTE);

/** The list's indexes in a random order that's the same for a given seed (mulberry32 + Fisher–Yates). */
function shuffled(length: number, seed: number) {
  let state = seed;
  const random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Each pass through the list is freshly shuffled, so quotes come in a random order without repeating. */
function quoteFor(minute: number) {
  const pass = Math.floor(minute / quotes.length);
  return quotes[shuffled(quotes.length, pass)[minute % quotes.length]];
}

/** A famous one-line quote and who said it, on frosted glass; a new one fades in every minute. */
export function MinuteQuote({ className }: { className?: string }) {
  const minute = useSyncExternalStore(subscribe, currentMinute, () => 0);
  const quote = quoteFor(minute);
  return (
    <figure key={minute} className={cx("quote glass", className)}>
      <blockquote>{quote.text}</blockquote>
      <figcaption>— {quote.by}</figcaption>
    </figure>
  );
}
