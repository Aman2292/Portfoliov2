"use client";

import { useRef, type ReactNode } from "react";
import { EASE_IN_OUT, EASE_OUT, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { afterIntro } from "@/lib/intro";

/** Fired by the hero's rotating words (see ScrollAnimations) with the index of the word now showing. */
export const HERO_WORD_EVENT = "hero:word";

/*
 * Everything is drawn in one 900 × 630 viewBox. Each object is designed in its own small units and
 * scaled in with `k`, so stroke widths are divided by `k` to stay even across the drawing.
 */
const FS = 15; // label size
const PAD = 12; // selection frame padding
const HANDLE = 7;

type Box = { x: number; y: number; w: number; h: number };

const BROWSER = { x: 160, y: 58, k: 600 / 260 };
const PHONE = { x: BROWSER.x - 93.5, y: BROWSER.y + 175, k: 170 / 100 };
const BAG = { x: BROWSER.x + 533.5, y: BROWSER.y + 265, k: 190 / 120 };

/** One selectable thing per rotating word: Applications, Websites, Shopify stores. */
const TARGETS: { box: Box; label: string }[] = [
  { box: { x: PHONE.x, y: PHONE.y, w: 100 * PHONE.k, h: 206 * PHONE.k }, label: "390 × 844" },
  { box: { x: BROWSER.x, y: BROWSER.y, w: 260 * BROWSER.k, h: 170 * BROWSER.k }, label: "1440 × 900" },
  { box: { x: BAG.x, y: BAG.y + 20 * BAG.k, w: 120 * BAG.k, h: 126 * BAG.k }, label: "2048 × 2048" },
];

function frameFor({ box, label }: (typeof TARGETS)[number]) {
  const x = box.x - PAD, y = box.y - PAD, w = box.w + 2 * PAD, h = box.h + 2 * PAD;
  const badgeW = label.length * FS * 0.62 + FS * 1.4;
  return {
    frame: { x, y, width: w, height: h },
    handles: [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([hx, hy]) => ({ x: hx - HANDLE / 2, y: hy - HANDLE / 2 })),
    badge: { x: x + w / 2 - badgeW / 2, y: y + h + FS * 0.8, width: badgeW },
    text: { x: x + w / 2, y: y + h + FS * 0.8 + FS * 0.9 },
  };
}

/**
 * Hero backdrop: a cobalt blueprint where a phone, a browser and a shopping bag draw themselves in
 * after the intro, and a design-tool selection follows the word the headline is showing.
 */
export function HeroBlueprint({ className, children }: { className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const strokes = q("[data-draw] :is(path, rect, circle, line)");
      const selection = q(".blueprint_selection");
      let current = 0;
      let ready = false;

      const select = (index: number) => {
        current = index;
        if (!ready) return;
        const next = frameFor(TARGETS[index]);
        const tween = { duration: 0.9, ease: EASE_IN_OUT, overwrite: true };
        gsap.to(q(".blueprint_frame"), { ...tween, attr: next.frame });
        q(".blueprint_handle").forEach((handle, i) => gsap.to(handle, { ...tween, attr: next.handles[i] }));
        gsap.to(q(".blueprint_badge"), { ...tween, attr: next.badge });
        const text = q(".blueprint_badge-text")[0];
        gsap
          .timeline()
          .to(text, { attr: next.text, ...tween })
          .to(text, { opacity: 0, duration: 0.2 }, 0)
          .call(() => void (text.textContent = TARGETS[index].label), [], 0.2)
          .to(text, { opacity: 1, duration: 0.3 }, 0.45);
      };

      const section = root.closest("section");
      const onWord = (event: Event) => select((event as CustomEvent<number>).detail);
      section?.addEventListener(HERO_WORD_EVENT, onWord);

      // Hidden until the curtain lifts, then drawn line by line.
      const fills = q("[data-draw] :is(.is-solid, .is-filled, text)");
      gsap.set(strokes, { attr: { pathLength: 1 }, strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(fills, { fillOpacity: 0 });
      gsap.set(selection, { opacity: 0 });
      const stopWaiting = afterIntro(() => {
        gsap
          .timeline()
          .to(strokes, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: { amount: 1.2, from: "start" } })
          .to(fills, { fillOpacity: 1, duration: 0.6, ease: EASE_OUT }, 0.6)
          .call(() => {
            ready = true;
            const first = frameFor(TARGETS[current]);
            gsap.set(q(".blueprint_frame"), { attr: first.frame });
            q(".blueprint_handle").forEach((handle, i) => gsap.set(handle, { attr: first.handles[i] }));
            gsap.set(q(".blueprint_badge"), { attr: first.badge });
            gsap.set(q(".blueprint_badge-text"), { attr: first.text, textContent: TARGETS[current].label });
          })
          .to(selection, { opacity: 1, duration: 0.6, ease: EASE_OUT });
      });

      return () => {
        stopWaiting();
        section?.removeEventListener(HERO_WORD_EVENT, onWord);
      };
    },
    { scope: ref },
  );

  const initial = frameFor(TARGETS[0]);

  return (
    <div ref={ref} className={className}>
      <svg className="blueprint_art" viewBox="0 0 900 630" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g data-draw>
          <Browser {...BROWSER} />
          <Phone {...PHONE} />
          <Bag {...BAG} />
          <DimensionH x1={BROWSER.x} x2={BROWSER.x + 600} y={BROWSER.y - 34} label="1440" />
          <DimensionV x={PHONE.x - 34} y1={PHONE.y} y2={PHONE.y + 206 * PHONE.k} label="844" />
        </g>
        <g className="blueprint_selection">
          <rect className="blueprint_frame" {...initial.frame} />
          {initial.handles.map((handle, i) => (
            <rect key={i} className="blueprint_handle" {...handle} width={HANDLE} height={HANDLE} />
          ))}
          <rect className="blueprint_badge" {...initial.badge} height={FS * 1.8} rx={FS * 0.35} />
          <text className="blueprint_badge-text" {...initial.text}>
            {TARGETS[0].label}
          </text>
        </g>
      </svg>
      {children}
    </div>
  );
}

/* ---------- Drawing parts ---------- */

type PartProps = { x: number; y: number; k: number };

/** Stroke widths in viewBox units, whatever the part's own scale. */
const widths = (k: number) => ({ main: 2 / k, thin: 1.2 / k, text: 3.6 / k });

/** A wireframe "line of text": a thick rounded stroke. */
function TextLine({ x1, x2, y, w, className = "is-soft" }: { x1: number; x2: number; y: number; w: number; className?: string }) {
  return <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={w} className={className} />;
}

/** Image placeholder: a box with crossed diagonals. */
function Placeholder({ x, y, w, h, rx, k }: { x: number; y: number; w: number; h: number; rx: number; k: number }) {
  const { main, thin } = widths(k);
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={rx} strokeWidth={main} />
      <line x1={x} y1={y} x2={x + w} y2={y + h} strokeWidth={thin} className="is-faint" />
      <line x1={x + w} y1={y} x2={x} y2={y + h} strokeWidth={thin} className="is-faint" />
    </>
  );
}

function Browser({ x, y, k }: PartProps) {
  const { main, thin, text } = widths(k);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <rect className="is-solid" width="260" height="170" rx="8" strokeWidth={main} />
      <line x1="0" y1="18" x2="260" y2="18" strokeWidth={thin} />
      {[10, 19, 28].map((cx) => (
        <circle key={cx} cx={cx} cy="9" r="2.6" strokeWidth={thin} className="is-soft" />
      ))}
      <rect x="80" y="4.5" width="100" height="9" rx="4.5" strokeWidth={thin} className="is-soft" />
      <rect x="12" y="28" width="9" height="9" rx="2" strokeWidth={thin} />
      {[150, 170, 190].map((lx) => (
        <TextLine key={lx} x1={lx} x2={lx + 12} y={32.5} w={text * 0.6} />
      ))}
      <rect x="214" y="26.5" width="34" height="12" rx="6" strokeWidth={thin} />
      <TextLine x1={12} x2={118} y={58} w={text * 1.35} className="is-line" />
      <TextLine x1={12} x2={92} y={70} w={text * 1.35} className="is-line" />
      <TextLine x1={12} x2={108} y={83} w={text * 0.7} />
      <TextLine x1={12} x2={84} y={89} w={text * 0.7} className="is-faint" />
      <rect x="12" y="98" width="38" height="12" rx="6" strokeWidth={thin} />
      <Placeholder x={136} y={48} w={112} h={64} rx={4} k={k} />
      {[12, 93, 174].map((cx) => (
        <g key={cx}>
          <rect x={cx} y="124" width="74" height="34" rx="4" strokeWidth={thin} className="is-soft" />
          <TextLine x1={cx + 7} x2={cx + 44} y={133} w={text * 0.7} />
          <TextLine x1={cx + 7} x2={cx + 60} y={141} w={text * 0.55} className="is-faint" />
          <TextLine x1={cx + 7} x2={cx + 50} y={147} w={text * 0.55} className="is-faint" />
        </g>
      ))}
    </g>
  );
}

function Phone({ x, y, k }: PartProps) {
  const { main, thin, text } = widths(k);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <rect className="is-solid" width="100" height="206" rx="17" strokeWidth={main} />
      <rect x="5" y="5" width="90" height="196" rx="13" strokeWidth={thin} className="is-soft" />
      <rect x="38" y="10" width="24" height="7" rx="3.5" strokeWidth={thin} className="is-filled" />
      <line x1="-2.5" y1="42" x2="-2.5" y2="52" strokeWidth={main} />
      <line x1="-2.5" y1="60" x2="-2.5" y2="78" strokeWidth={main} />
      <line x1="102.5" y1="62" x2="102.5" y2="90" strokeWidth={main} />
      <TextLine x1={14} x2={48} y={31} w={text * 1.15} className="is-line" />
      <circle cx="82" cy="31" r="4" strokeWidth={thin} className="is-soft" />
      <Placeholder x={12} y={42} w={76} h={54} rx={6} k={k} />
      <TextLine x1={14} x2={72} y={108} w={text} />
      <TextLine x1={14} x2={54} y={116} w={text} className="is-faint" />
      {[134, 152, 170].map((ry, i) => (
        <g key={ry}>
          <circle cx="19" cy={ry} r="5" strokeWidth={thin} className="is-soft" />
          <TextLine x1={30} x2={80 - i * 8} y={ry - 2} w={text} />
          <TextLine x1={30} x2={60 - i * 4} y={ry + 4} w={text * 0.7} className="is-faint" />
        </g>
      ))}
      <line x1="5" y1="184" x2="95" y2="184" strokeWidth={thin} className="is-faint" />
      {[24, 41, 58, 75].map((cx, i) => (
        <circle key={cx} cx={cx} cy="192" r="2.6" strokeWidth={thin} className={i === 0 ? "is-filled" : "is-soft"} />
      ))}
    </g>
  );
}

function Bag({ x, y, k }: PartProps) {
  const { main, thin, text } = widths(k);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="is-solid" d="M16 40 H104 L112 140 a6 6 0 0 1 -6 6 H14 a6 6 0 0 1 -6 -6 Z" strokeWidth={main} />
      <path d="M40 46 V30 a20 20 0 0 1 40 0 V46" strokeWidth={main} />
      <circle cx="40" cy="50" r="3" strokeWidth={thin} />
      <circle cx="80" cy="50" r="3" strokeWidth={thin} />
      <path d="M16 40 L22 58 M104 40 L98 58" strokeWidth={thin} className="is-faint" />
      <rect x="34" y="82" width="52" height="34" rx="4" strokeWidth={thin} className="is-soft" />
      <TextLine x1={42} x2={74} y={94} w={text * 1.1} className="is-line" />
      <TextLine x1={42} x2={62} y={104} w={text * 0.7} />
    </g>
  );
}

/** Architectural dimension line: slash ticks, extension lines and a label breaking the line. */
function DimensionH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  const t = FS * 0.45, mid = (x1 + x2) / 2, gap = label.length * FS * 0.36 + FS * 0.8;
  return (
    <g className="blueprint_dim">
      <line x1={x1} y1={y} x2={mid - gap} y2={y} />
      <line x1={mid + gap} y1={y} x2={x2} y2={y} />
      <line x1={x1 - t} y1={y + t} x2={x1 + t} y2={y - t} />
      <line x1={x2 - t} y1={y + t} x2={x2 + t} y2={y - t} />
      <line x1={x1} y1={y - t * 1.6} x2={x1} y2={y + 26} />
      <line x1={x2} y1={y - t * 1.6} x2={x2} y2={y + 26} />
      <text x={mid} y={y + 0.5}>
        {label}
      </text>
    </g>
  );
}

function DimensionV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  const t = FS * 0.45, mid = (y1 + y2) / 2, gap = label.length * FS * 0.36 + FS * 0.8;
  return (
    <g className="blueprint_dim">
      <line x1={x} y1={y1} x2={x} y2={mid - gap} />
      <line x1={x} y1={mid + gap} x2={x} y2={y2} />
      <line x1={x - t} y1={y1 + t} x2={x + t} y2={y1 - t} />
      <line x1={x - t} y1={y2 + t} x2={x + t} y2={y2 - t} />
      <line x1={x - t * 1.6} y1={y1} x2={x + 26} y2={y1} />
      <line x1={x - t * 1.6} y1={y2} x2={x + 26} y2={y2} />
      <text x={x} y={mid} transform={`rotate(-90 ${x} ${mid})`}>
        {label}
      </text>
    </g>
  );
}
