import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Card from "../ui/Card.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

/**
 * The trust beat. We don't have advisor headshots or press logos, and we
 * won't invent them. What we do have is true: a real founder's story,
 * told plainly.
 *
 * The pull quote uses the system's card surface rather than a bespoke
 * blockquote rule, so it inherits the one validated shadow and the card
 * corner like everything else.
 *
 * surface="off-white" so it reads as a distinct section when stacked
 * with Values and Contact on the merged /about page, rather than
 * blending into the page's own cream-peach background.
 */
export default function FounderStory() {
  const story = useScrollReveal(0.15);
  const quote = useScrollReveal(0.3);

  return (
    <Section id="story" surface="off-white">
      <SectionHeading
        as="h1"
        label="Our story"
        title="It started with a couple who couldn't find what their daughter needed."
        align="center"
      />

      <div
        ref={story.ref}
        className={`reveal ${story.inView ? "in-view" : ""} type-body-regular mx-auto mt-2xl flex max-w-measure-xl flex-col gap-md text-slate-blue`}
      >
        <p>
          Like many parents in Gurugram, Sakshi and Rachit spent weeks visiting
          preschools for Mehr. They met passionate teachers. They saw well-run
          centres. They found warm caregivers. Never all three, never in one
          place.
        </p>
        <p>
          One evening, watching Mehr play, Sakshi remembered the neighbourhood
          she grew up in — where aunties and uncles looked out for every child,
          where you could knock on any door. And it landed: we haven&rsquo;t
          just lost our padosis. We&rsquo;ve lost the entire village it takes to
          raise a child.
        </p>
        <p>So they started building it back.</p>
        <p>And then Rudr arrived.</p>
        <p>
          Suddenly they weren&rsquo;t just building for Mehr anymore — they were
          living the exact problem they&rsquo;d set out to solve. Two children,
          one village missing, and a half-built answer in their hands.
          That&rsquo;s when it stopped being a project and started being urgent.
        </p>
        <p>
          Warm spaces where children belong. Neighbours who become familiar. And
          a quiet layer of guidance, so no parent ever has to figure it out in
          the dark — the way they once did.
        </p>
      </div>

      <Card
        as="blockquote"
        ref={quote.ref}
        surface="cream-peach"
        elevated
        className={`reveal ${quote.inView ? "in-view" : ""} mx-auto mt-2xl max-w-measure-xl text-center`}
      >
        <p className="type-sub-heading text-deep-purple">
          &ldquo;We&rsquo;re not trying to bring back the past. We&rsquo;re
          rebuilding the village for today&rsquo;s families — one child, one
          parent, one family at a time.&rdquo;
        </p>
        <AccentLabel as="footer" className="mt-lg">
          Sakshi &amp; Rachit, Founders
        </AccentLabel>
      </Card>
    </Section>
  );
}
