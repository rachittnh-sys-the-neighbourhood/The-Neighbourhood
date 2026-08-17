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
 * Refresh's dark card carries the same layered-atmosphere treatment as
 * the rest of the homepage (--gradient-dark in index.css) instead of the
 * two flat blob circles it used to — very low-opacity primary/accent
 * pooling into the charcoal, so it reads as depth on a dark surface, not
 * as a lit one. Legacy keeps its original flat blob circles untouched.
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
            legacy ? "bg-light-amber" : "bg-charcoal bg-gradient-dark"
          } relative overflow-hidden rounded-rounded px-lg py-3xl text-center md:px-2xl`}
        >
          {/* Legacy's blobs live in their own clipping layer pinned to
              the panel's box. An absolutely positioned child that
              extends past its parent still counts toward scrollHeight,
              which would make the panel itself scrollable when the
              button inside receives focus. Refresh needs no equivalent
              layer — its atmosphere is a background-image on the panel
              itself, not a positioned child. */}
          {legacy && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="blob-float absolute -right-2xl -top-2xl h-[280px] w-[280px] rounded-circle bg-white/40" />
              <div className="blob-float-slow absolute -bottom-2xl -left-2xl h-[240px] w-[240px] rounded-circle bg-sage/25" />
            </div>
          )}

          <div className="relative z-10 mx-auto max-w-measure-lg">
            <AccentLabel tone={legacy ? "deep-purple" : "white"}>
              An invitation
            </AccentLabel>

            <h2
              className={`type-section-heading mt-md ${
                legacy ? "text-deep-purple" : "text-white"
              }`}
              style={
                legacy
                  ? undefined
                  : {
                      // The same editorial treatment as the hero and the
                      // other standalone declarative headings (see
                      // SectionHeading's `serif` prop) — this section
                      // doesn't use that shared component, so the same
                      // three properties are set directly here. Colour
                      // stays text-white (set via className above) since
                      // this sits on the dark card, not the cream
                      // background the hero's #3A2116 was tuned for.
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.08,
                    }
              }
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
