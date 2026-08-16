import heroFamilyVideo from "../../assets/hero-family-video.mp4";
import { Container } from "../ui/Section.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import Button from "../ui/Button.jsx";
import Tag from "../ui/Tag.jsx";

/**
 * Section 1 — Hero.
 *
 * The reference hero is a single centred column on the Cream Peach wash:
 * accent label, Hero Display headline, Body Large lead, one amber pill
 * CTA, then a large photo inset in an organic blob frame with a dashed
 * Warm Orange outline offset behind it. That structure is reproduced
 * here; only the words and the footage are ours.
 *
 * One CTA. "Start with your child" rather than "Join the waitlist" —
 * personalization begins immediately, and the amber fill is spent on the
 * single most important action on the page, as the system requires.
 *
 * The atmosphere wash and trust badge are refresh-only (`legacy` skips
 * both) — a token override can restyle an existing element, but adding
 * or removing one needs the prop. The wash (--gradient-warm, defined in
 * index.css) replaces what used to be two flat decorative circles here:
 * layered radial pools rather than distinct shapes, so the background
 * reads as unevenly lit rather than as circles-on-a-page.
 */
export default function HeroV4({ onJoin, legacy = false }) {
  return (
    <header
      id="top"
      className={`${legacy ? "" : "bg-gradient-warm"} relative overflow-hidden pb-2xl pt-[calc(var(--spacing-3xl)+var(--spacing-2xl))] md:pb-3xl`}
    >
      <Container className="relative">
        <div className="mx-auto max-w-measure-xl text-center">
          <AccentLabel className="enter-up">
            The village, rebuilt
          </AccentLabel>

          <h1
            className="enter-up type-hero-display mt-lg text-deep-purple"
            data-delay="1"
          >
            Raising a child was never meant to be done alone.
          </h1>

          <p
            className="enter-up type-body-large mx-auto mt-lg max-w-measure text-slate-blue"
            data-delay="2"
          >
            Real spaces. Real neighbours. Guidance that knows your child.
          </p>

          <div
            className="enter-up mt-xl flex flex-col items-center justify-center gap-md sm:flex-row"
            data-delay="3"
          >
            <Button size="lg" onClick={onJoin}>
              Start with your child
            </Button>
            <span className="type-body-regular text-slate-blue">
              Takes less than 30 seconds
            </span>
          </div>

          {/* The one trust signal above the fold — the same claim
              GroundedIn makes further down, brought forward rather than
              invented fresh for the hero. */}
          {!legacy && (
            <div className="enter-up mt-lg flex justify-center" data-delay="3">
              <Tag icon="verified">
                Grounded in WHO &amp; IAP developmental science
              </Tag>
            </div>
          )}
        </div>

        {/* The photo inset. Sits inside the column, never bleeding to the
            viewport edge. */}
        <div
          className="enter-up relative mx-auto mt-3xl max-w-measure-xl"
          data-delay="4"
        >
          <div
            aria-hidden="true"
            className="dashed-outline pointer-events-none absolute inset-0 translate-x-lg translate-y-lg rounded-rounded"
          />

          <div className="relative overflow-hidden rounded-rounded bg-light-amber">
            <video
              src={heroFamilyVideo}
              className="aspect-video w-full object-cover"
              aria-label="A warm glimpse of family life inside The Neighbourhood"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={(event) => {
                event.currentTarget.play().catch(() => {});
              }}
            />
          </div>

          {/* Grounding caption card — names the moment, not an
              unverifiable fact like a specific city. */}
          <div className="absolute -bottom-lg left-lg max-w-[16rem] rounded-card border border-lavender-mist bg-white p-md shadow-subtle-lift md:left-xl">
            <div className="flex items-center gap-sm">
              <span className="relative flex h-xs w-xs">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-circle bg-sage opacity-75" />
                <span className="relative inline-flex h-xs w-xs rounded-circle bg-sage" />
              </span>
              <span className="type-caption text-warm-taupe">
                The feeling we&rsquo;re building
              </span>
            </div>
            <p className="type-body-regular mt-xs text-deep-purple">
              Warmth, rhythm, and room to grow.
            </p>
          </div>
        </div>
      </Container>
    </header>
  );
}
