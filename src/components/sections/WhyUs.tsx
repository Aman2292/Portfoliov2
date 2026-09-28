import Image from "next/image";
import { Fragment } from "react";
import { whyUs } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export function WhyUs() {
  const { team, chat, pricing } = whyUs;

  return (
    <section id="why" className="section_home-grid">
      <div className="padding-global is-tiny">
        <div className="line" data-line />
      </div>
      <div className="padding-section-small" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="head-grid">
            <Label>{whyUs.label}</Label>
            <div className="brands_heading" data-reveal>
              <h3 className="heading-style-h4">{whyUs.heading}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-xlarge" />

      <div className="padding-global is-tiny">
        <div className="home-grid_component">
          {/* Team: two counter-rotating rings of avatars */}
          <div className="home-grid_team is-span-rows" data-reveal>
            <h4 className="home-grid_team-heading">{team.heading}</h4>
            <div className="home-grid_circle-1" aria-hidden="true">
              {team.outerRing.map((member, i) => (
                <Image key={i} src={member} alt="" className={`home-grid_member _${i + 1}`} sizes="80px" />
              ))}
            </div>
            <div className="home-grid_circle-2" aria-hidden="true">
              {team.innerRing.map((member, i) => (
                <Image key={i} src={member} alt="" className={`home-grid_member-in _${i + 1}`} sizes="80px" />
              ))}
            </div>
          </div>

          {/* Chat: bubbles pop in one after another (see data-chat in ScrollAnimations) */}
          <div className="home-grid_chat" data-reveal>
            <div className="home-grid_label">{chat.label}</div>
            <div className="home-grid_chat-in" data-chat>
              <div className="home-grid_chat-group _1">
                <Image src={chat.incoming.avatar} alt="" className="chat_pic _1" sizes="40px" />
                <div className="home-grid_chats">
                  <ChatMessages messages={chat.incoming.messages} animateFirst={false} />
                </div>
              </div>
              <div className="home-grid_chat-group _2">
                <div className="home-grid_chats _2">
                  <ChatMessages messages={chat.reply.messages} reply />
                </div>
                <Image src={chat.reply.avatar} alt="" className="chat_pic _2" sizes="40px" data-chat-step="avatar" />
              </div>
            </div>
          </div>

          <div className="home-grid_pricing" data-reveal>
            <Image
              src={pricing.image}
              alt=""
              className="home-grid_pricing-img"
              sizes="(max-width: 479px) 80vw, (max-width: 991px) 60vw, 30vw"
            />
            <h4 className="home-grid_pricing-title">{pricing.title}</h4>
            <Button href={pricing.cta.href} variant="small">
              {pricing.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMessages({ messages, reply, animateFirst = true }: { messages: string[]; reply?: boolean; animateFirst?: boolean }) {
  return messages.map((message, i) => (
    <Fragment key={i}>
      {i > 0 && <div className="chat_spacing" />}
      <div
        className={reply ? "chat_message is-reply" : "chat_message"}
        data-chat-step={i > 0 || animateFirst ? "message" : undefined}
      >
        <div className="home-grid_message">
          <p className="home-grid_message-text">{message}</p>
        </div>
      </div>
    </Fragment>
  ));
}
