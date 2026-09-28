/** Tiny looping mono ticker ("Scroll to reveal —"). Purely decorative. */
export function NoteMarquee({ text }: { text: string }) {
  return (
    <div className="note-marquee_component" aria-hidden="true">
      <div className="note-marquee_in">
        {[0, 1, 2].map((i) => (
          <div key={i} className="note-marquee_text">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
