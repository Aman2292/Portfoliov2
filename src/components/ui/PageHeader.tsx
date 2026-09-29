import type { ReactNode } from "react";

/** Top of an inner page: big display heading, then a label + intro on the left and an optional aside on the right. */
export function PageHeader({ heading, label, text, aside }: { heading: string; label: string; text: string; aside?: ReactNode }) {
  return (
    <>
      <div className="padding-section-small is-mobile-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="category_head">
            <h1 className="heading-style-display category_heading" data-reveal>
              {heading}
            </h1>
            <div className="category_meta" data-reveal>
              <div className="work-list_head-texts">
                <div className="text-style-label">{label}</div>
                <p className="text-size-small text-size-grey-400">{text}</p>
              </div>
              {aside}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
