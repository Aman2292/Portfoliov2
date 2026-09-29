import Image from "next/image";
import { aboutPage, journey } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

/** Dark image card inviting visitors to the Journey page. */
export function JourneyTeaser() {
  const teaser = aboutPage.journeyTeaser;
  const { milestones } = journey;
  return (
    <section className="section_journey-teaser">
      <div className="padding-global is-tiny">
        <div className="journey-teaser_card" data-reveal>
          <Image src={teaser.image} alt="" className="journey-teaser_img" sizes="100vw" data-parallax="scale" />
          <div className="journey-teaser_shade" />
          <div className="journey-teaser_content">
            <Label light>{teaser.label}</Label>
            <h2 className="heading-style-h2 text-color-white journey-teaser_heading">{teaser.heading}</h2>
            <div className="journey-teaser_bottom">
              <Button href={teaser.href} variant="white">
                {teaser.cta}
              </Button>
              <div className="journey-teaser_years" aria-label={`From ${milestones[0].year} to ${milestones.at(-1)?.year}`}>
                {milestones[0].year} — {milestones.at(-1)?.year}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
