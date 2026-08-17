import heroFamilyVideo from "../../assets/hero-family-video.mp4";
import { Container } from "../ui/Section.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import Button from "../ui/Button.jsx";

/**
 * Section 1 — Hero.
 *
 * Editorial redesign, scoped to this file only: one calm centred
 * composition (eyebrow → headline → lead → CTA → a quiet trust line),
 * generous whitespace, and the photo pushed well below the fold so it
 * reads as the start of the next chapter rather than competing with the
 * headline. Colours and sizes below are literal, one-off values rather
 * than global token overrides — they were specified as exact hexes/px
 * for this hero specifically, and routing them through --color-* or
 * --font-hero-display-* would leak into every other surface that reads
 * those tokens (body text, other headings, the legacy edition). Brand
 * tokens are still reused wherever the target value already matches one
 * (--font-playfair, --color-primary, --color-muted, the spacing scale
 * for the photo block) — see inline comments below for which is which.
 *
 * The atmosphere wash and trust line are refresh-only (`legacy` skips
 * both), matching the prior hero's behaviour.
 */
export default function HeroV4({ onJoin, legacy = false }) {
  return (
    <header
      id="top"
      className="relative overflow-hidden pb-2xl pt-[calc(var(--spacing-3xl)+var(--spacing-2xl))] md:pb-3xl"
      style={{
        // --color-background now equals this hero's tone exactly (see
        // index.css), so every cream-peach section down the page shares
        // it — reading the token here instead of repeating the literal
        // keeps that single source of truth intact.
        backgroundColor: "var(--color-background)",
        // Extremely subtle warm radial — reads as flat at a glance, only
        // shows as a soft light pool once you look for it.
        backgroundImage: !legacy
          ? "radial-gradient(circle at 50% 35%, #F9ECDD 0%, var(--color-background) 50%, #F9E6CA 100%)"
          : undefined,
      }}
    >
      <Container className="relative">
        <div className="mx-auto max-w-measure-xl text-center">
          <AccentLabel className="enter-up">
            The village, rebuilt
          </AccentLabel>

          {/* Three explicit lines, matching the supplied reference
              crop: "Raising a child was" / "never meant to be done" /
              "alone." — forced rather than left to wrap, so the break
              points stay exactly here regardless of viewport width. */}
          <h1
            className="enter-up mx-auto mt-[36px] max-w-measure-xl"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.75rem, 2.4vw + 2.2rem, 4.5rem)",
              lineHeight: 0.94,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#3A2116",
            }}
            data-delay="1"
          >
            Raising a child was{" "}
            <br className="hidden md:inline" />
            never meant to be done
            <br />
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#E6844D",
              }}
            >
              alone.
            </span>
          </h1>

          <p
            className="enter-up mx-auto mt-[30px]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#817C74",
              maxWidth: "30rem",
            }}
            data-delay="2"
          >
            Real spaces. Real neighbours. Guidance that knows your child.
          </p>

          <div
            className="enter-up mt-[34px] flex flex-col items-center justify-center gap-[14px] sm:flex-row sm:gap-[20px]"
            data-delay="3"
          >
            <Button
              size="lg"
              onClick={onJoin}
              className="w-full sm:w-auto"
              style={{
                height: "60px",
                paddingLeft: "44px",
                paddingRight: "44px",
                // Darker, more neutral than the brand's cocoa primary —
                // tested in the #292929–#302A25 charcoal-brown range
                // asked for; picked the warmer end so it still reads as
                // this brand's ink rather than a generic dark UI grey.
                backgroundColor: "#2E2823",
                // Substantially lighter than the previous pass: a short,
                // low-opacity contact shadow rather than a lifted-card
                // shadow, and no inset highlight.
                boxShadow: "0 3px 10px -4px rgba(20, 16, 14, 0.28)",
              }}
            >
              Start with your child
            </Button>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "15.5px",
                color: "#6F665D",
              }}
            >
              Takes less than 30 seconds
            </span>
          </div>

          {/* Quiet trust line — the same claim GroundedIn makes further
              down, brought forward, but as understated inline text with
              a small icon rather than a floating pill/card. */}
          {!legacy && (
            <div
              className="enter-up mt-[24px] flex items-center justify-center gap-[6px]"
              style={{ opacity: 0.8 }}
              data-delay="3"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "13px", color: "var(--color-muted)" }}
                aria-hidden="true"
              >
                verified
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  textAlign: "center",
                }}
              >
                Grounded in WHO &amp; IAP developmental science
              </span>
            </div>
          )}
        </div>

        {/* The photo inset — pushed further down (spacing scale, not a
            one-off value: --spacing-3xl is already 100px, inside the
            90–130px target) so it reads as the next chapter rather than
            part of the hero composition. */}
        <div
          className="enter-up relative mx-auto mt-3xl max-w-measure-xl md:mt-[130px]"
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
