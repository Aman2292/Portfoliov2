import { journey } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { Odometer } from "@/components/ui/Odometer";

/** Rolling counters under the journey timeline. */
export function JourneyStats() {
  const { stats } = journey;
  return (
    <section className="section_journey-stats">
      <div className="padding-section-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <Label>{stats.label}</Label>
          <div className="spacer-large" />
          <div className="testimonials_numbers-main">
            {stats.items.map((stat) => (
              <div key={stat.label} className="number_block">
                <Odometer value={stat.value} suffix={stat.suffix} />
                <p className="number_desc">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
