import type { Metadata } from "next";
import { journey } from "@/content/site";
import { Cta } from "@/components/sections/Cta";
import { JourneyStats } from "@/components/sections/JourneyStats";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Journey", description: journey.intro };

export default function JourneyPage() {
  const { milestones } = journey;
  return (
    <>
      <section className="section_journey-header">
        <PageHeader
          heading={journey.heading}
          label={journey.label}
          text={journey.intro}
          aside={
            <div className="heading-style-h2 text-weight-medium">
              {milestones[0].year}—{milestones.at(-1)?.year}
            </div>
          }
        />
        <div className="spacer-huge" />
      </section>
      <JourneyTimeline milestones={milestones} note={journey.scrollNote} />
      <JourneyStats />
      <Cta />
    </>
  );
}
