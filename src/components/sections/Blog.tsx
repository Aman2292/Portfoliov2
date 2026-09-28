import Image from "next/image";
import { blog } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export function Blog() {
  return (
    <section id="blog" className="section_blog-list">
      <div className="padding-section-large" />
      <div className="padding-global">
        <div className="container-large">
          <div className="blog-list_component">
            <div className="blog-list_head">
              <div className="blog-list_label-wrap">
                <Label>{blog.label}</Label>
              </div>
              <div className="brands_heading">
                <h2 className="heading-style-h3" data-reveal>
                  {blog.heading}
                </h2>
              </div>
              <div className="blog-list_button" data-reveal>
                <Button href={blog.cta.href} variant="black">
                  {blog.cta.label}
                </Button>
              </div>
            </div>
            <div className="spacer-large" />

            <div role="list" className="blog-list_list">
              {blog.posts.map((post) => (
                <div key={post.title} role="listitem" className="blog-list_item">
                  <a href={post.href} className="blog-list_block w-inline-block">
                    <div className="blog-list_img-wrap">
                      <Image src={post.image} alt="" className="blog-list_img" sizes="(max-width: 479px) 100vw, 33vw" />
                    </div>
                    <div className="blog-list_texts">
                      <p className="blog-list_date">{post.date}</p>
                      <h3 className="heading-style-h6">{post.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
