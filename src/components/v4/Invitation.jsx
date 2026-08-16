import { Container } from "../ui/Section.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import Button from "../ui/Button.jsx";
import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 7 — The Invitation.
 *
 * Two editions, genuinely different treatments here, not just retoned:
 *
 *   refresh (default)   a dark charcoal card — the treatment from the
 *                        earliest version of this section, restored on
 *                        request. The colour flip is what makes the
 *                        final ask feel like arriving somewhere, rather
 *                        than scrolling past one more section on cream.
 *   legacy               the live site's Light Amber panel — it never
 *                        inverts to a dark card, it warms the surface
 *                        instead.
 *
 * Both share the same structure (blobs, copy, CTA) and swap only colour
 * and surface, so the two stay obviously the same section wearing
 * different clothes rather than two different sections.
 *
 * CTA label matches the hero deliberately: by here the parent has been
 * asked the same simple thing three times, in three different emotional
 * states. No countdown, no "spots remaining", no urgency device.
 */
export default function Invitation({ onJoin, legacy = false }) {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section id="invitation" className="pb-3xl pt-2xl">
      <Container>
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} ${
            legacy ? "bg-light-amber" : "bg-charcoal"
          } relative overflow-hidden rounded-rounded px-lg py-3xl text-center md:px-2xl`}
        >
          {/* The blobs live in their own clipping layer pinned to the
              panel's box. An absolutely positioned child that extends
              past its parent still counts toward scrollHeight, which
              would make the panel itself scrollable when the button
              inside receives focus. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {legacy ? (
              <>
                <div className="blob-float absolute -right-2xl -top-2xl h-[280px] w-[280px] rounded-circle bg-white/40" />
                <div className="blob-float-slow absolute -bottom-2xl -left-2xl h-[240px] w-[240px] rounded-circle bg-sage/25" />
              </>
            ) : (
              <>
                <div className="blob-float absolute -right-2xl -top-2xl h-[280px] w-[280px] rounded-circle bg-soft-sand/10" />
                <div className="blob-float-slow absolute -bottom-2xl -left-2xl h-[240px] w-[240px] rounded-circle bg-sage/10" />
              </>
            )}
          </div>

          <div className="relative z-10 mx-auto max-w-measure-lg">
            <AccentLabel tone={legacy ? "deep-purple" : "white"}>
              An invitation
            </AccentLabel>

            <h2
              className={`type-section-heading mt-md ${
                legacy ? "text-deep-purple" : "text-white"
              }`}
            >
              There&rsquo;s a place here for your family.
            </h2>

            <p
              className={`type-body-large mx-auto mt-lg max-w-measure ${
                legacy ? "text-slate-blue" : "text-white/85"
              }`}
            >
              Be among the founding families of The Neighbourhood. We&rsquo;ll
              write to you as the doors open.
            </p>

            <div className="mt-xl">
              <Button size="lg" variant="secondary" onClick={onJoin}>
                Start with your child
              </Button>
            </div>

            <p
              className={`type-caption mt-md font-normal ${
                legacy ? "text-slate-blue" : "text-white/70"
              }`}
            >
              Less than 30 seconds &middot; Free during early access &middot; A
              quiet inbox, promised
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
