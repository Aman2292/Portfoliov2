import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section_work-list">
      <div className="padding-section-small is-mobile-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="category_head">
            <h1 className="heading-style-display category_heading">404.</h1>
            <p className="heading-style-h6">This page doesn&apos;t exist.</p>
            <div>
              <Button href="/" variant="black">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-large" />
    </section>
  );
}
