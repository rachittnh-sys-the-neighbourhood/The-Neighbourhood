/**
 * Section shell — the single centred column the whole reference layout
 * is built from. Gutters and vertical rhythm come from spacing tokens
 * only, stepping up across the mobile → tablet → desktop tiers exactly
 * as DESIGN.md's responsive strategy describes.
 */
const SURFACES = {
  none: "",
  "cream-peach": "bg-cream-peach",
  "off-white": "bg-off-white",
  "light-amber": "bg-light-amber",
  "purple-tint": "bg-purple-tint",
  white: "bg-white",
};

/* The same surfaces as fill values, for the wave divider. It has to be
   painted in the section's OWN colour: the wave sits above the section
   and overlaps the one before it, so it reads as this section's edge
   bulging upward rather than as a shape floating between the two. */
const SURFACE_FILLS = {
  none: "var(--color-cream-peach)",
  "cream-peach": "var(--color-cream-peach)",
  "off-white": "var(--color-off-white)",
  "light-amber": "var(--color-light-amber)",
  "purple-tint": "var(--color-purple-tint)",
  white: "var(--color-white)",
};

/* One period of gentle, slightly irregular scallops. The bumps are not
   evenly spaced — a pure sine reads mechanical at this scale, and the
   variation is what makes it feel hand-drawn.

   preserveAspectRatio="none" lets it stretch to any viewport width. That
   distorts the curve horizontally, which is fine for a soft wave and is
   why the amplitude is set in px on the wrapper rather than scaling. */
const WAVE_PATH =
  "M0,34 C70,6 150,6 220,30 S360,58 450,32 S590,4 690,28 " +
  "S840,56 940,30 S1090,6 1190,30 S1340,54 1440,28 L1440,56 L0,56 Z";

function WaveTop({ surface }) {
  const fill = SURFACE_FILLS[surface];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-[34px] md:h-[72px]"
    >
      {/* Two viewBoxes over ONE path, rather than one path stretched to
          both widths. Squeezing all six bumps into a phone turned them
          into tight scallops — a different texture from the wide, gentle
          curve on desktop. Narrowing the viewBox instead crops to the
          first couple of bumps, so the wave keeps the same character at
          every size. */}
      <svg
        viewBox="0 0 620 56"
        preserveAspectRatio="none"
        className="block h-full w-full md:hidden"
      >
        <path d={WAVE_PATH} fill={fill} />
      </svg>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="hidden h-full w-full md:block"
      >
        <path d={WAVE_PATH} fill={fill} />
      </svg>
    </div>
  );
}

export function Container({ className = "", children }) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-lg md:px-xl lg:px-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function Section({
  as: Tag = "section",
  surface = "none",
  waveTop = false,
  className = "",
  containerClassName = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`py-2xl md:py-3xl ${SURFACES[surface]} ${
        waveTop ? "relative" : ""
      } ${className}`}
      {...props}
    >
      {/* Sits outside the section's own box (bottom-full), so it needs a
          caller without overflow-hidden — Welcome clips, Today does not. */}
      {waveTop && <WaveTop surface={surface} />}
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
