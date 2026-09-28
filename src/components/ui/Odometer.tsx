/**
 * Rolling counter. Each digit is a column of numbers that ScrollAnimations slides up
 * to the final value; the markup already shows the final value so it reads correctly without JS.
 */
export function Odometer({ prefix = "", value, suffix = "" }: { prefix?: string; value: string; suffix?: string }) {
  return (
    <div className="number_wrap" aria-label={`${prefix}${value}${suffix}`} role="img">
      {prefix && <StaticChar char={prefix} />}
      {[...value].map((char, i) =>
        /\d/.test(char) ? <DigitColumn key={i} digit={Number(char)} steps={3 + i * 2} /> : <StaticChar key={i} char={char} />,
      )}
      {suffix && <StaticChar char={suffix} />}
    </div>
  );
}

function StaticChar({ char }: { char: string }) {
  return (
    <div className="number_group" aria-hidden="true">
      <div className="number_number">{char}</div>
    </div>
  );
}

function DigitColumn({ digit, steps }: { digit: number; steps: number }) {
  // Count up to the final digit, e.g. digit 4 with 3 steps -> 1, 2, 3, [4]
  const lead = Array.from({ length: steps }, (_, i) => (digit - steps + i + 10) % 10);
  return (
    <div className="number_group" aria-hidden="true">
      <div className="number_main">
        <div className="number_number">{digit}</div>
      </div>
      <div className="number_others is-final" data-odometer>
        {lead.map((n, i) => (
          <div key={i} className="number_number">
            {n}
          </div>
        ))}
        <div className="number_number final-number">{digit}</div>
      </div>
    </div>
  );
}
