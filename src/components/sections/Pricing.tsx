import { pricing } from "@/content/site";
import { GradientButton } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export function Pricing() {
  return (
    <section id="pricing" className="section_pricing">
      <div className="padding-global is-tiny">
        <div className="pricing_component">
          <div className="padding-section-medium" />
          <div className="padding-global">
            <div className="container-xsmall">
              <div className="pricing_wrap">
                <div className="pricing_head">
                  <Label light>{pricing.label}</Label>
                  <h2 className="pricing_heading" data-reveal>
                    {pricing.heading}
                  </h2>
                </div>

                <div className="pricing_blocks">
                  {pricing.plans.map((plan) => (
                    <div key={plan.name} className="pricing_block" data-reveal>
                      <div className="pricing_detail">{plan.badge}</div>
                      <div className="pricing_main">
                        <div className="pricing_value-wrap">
                          <h2 className="pricing_plan-name">{plan.name}</h2>
                          <div className="pricing_value">
                            <div className="pricing_money">
                              <span className="pricing_dollar">$</span>
                              {plan.price}
                            </div>
                            <div className="pricing_plan-info">{plan.period}</div>
                          </div>
                        </div>
                        <ul role="list" className="pricing_features">
                          {plan.features.map(([highlight, rest], i) => (
                            <li key={i} className="pricing_feature">
                              <p className="pricing_feature-text">
                                <span className="pricing_feature-detail">{highlight}</span>
                                {rest}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pricing_button-wrapper">
                        <div className="pricing_divider">
                          <div className="pricing_divider-line" />
                          <div className="pricing_divider-label">{plan.term}</div>
                          <div className="pricing_divider-line" />
                        </div>
                        <GradientButton href={plan.cta.href} light={plan.light}>
                          {plan.cta.label}
                        </GradientButton>
                        <div className="pricing_guarantee">{plan.guarantee}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="spacer-medium" />
                <div className="pricing_info-wrap">
                  <p className="pricing_info-text" data-reveal>
                    {pricing.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="padding-section-medium" />
        </div>
      </div>
    </section>
  );
}
