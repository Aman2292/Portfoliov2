"use client";

import { useState, type TransitionEvent } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { cx } from "@/lib/utils";

type Item = { question: string; answer: string };

export function FaqList({ items }: { items: Item[] }) {
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(new Set());

  const toggle = (index: number) =>
    setOpenItems((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  // Opening an answer pushes the rest of the page down, so scroll-triggered animations need new positions.
  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === "grid-template-rows") ScrollTrigger.refresh();
  };

  return (
    <div className="faq_list" data-reveal>
      {items.map((item, i) => {
        const open = openItems.has(i);
        return (
          <div key={i} className={cx("faq_accordion", open && "is-open")}>
            <button
              type="button"
              id={`faq-question-${i}`}
              className="faq_question-wrap"
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="faq_question-main">
                <span className="faq_number">{i + 1}</span>
                <span className="faq_question">{item.question}</span>
              </span>
              <span className="faq_button" aria-hidden="true">
                <span className="faq_button-line" />
                <span className="faq_button-line is-second" />
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              className="faq_answer-wrap"
              role="region"
              aria-labelledby={`faq-question-${i}`}
              aria-hidden={!open}
              onTransitionEnd={onTransitionEnd}
            >
              <div className="faq_answer-inner">
                <div className="faq_answer-spacing" />
                <div className="faq_answer">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
