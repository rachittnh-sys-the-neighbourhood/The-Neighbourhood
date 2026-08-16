import { forwardRef } from "react";

/**
 * Card surface — `card` radius (24px) on a White or Off White wash, with
 * a Lavender Mist hairline and a soft lifted shadow by default (see
 * --shadow-card in index.css — the Nestology reference's cards read as
 * lifted, not printed on the page). `elevated` steps up to the stronger
 * --shadow-subtle-lift for a surface that should read as genuinely
 * above the rest (a highlighted card, a hovered state held in place).
 *
 * Forwards its ref so the scroll-reveal hook can observe a card directly
 * without an extra wrapper element.
 */
// "white" resolves to the palette's warm card colour rather than true
// white: on a cream page, a pure-white card reads as a hole punched in
// the page. True white is reserved for genuinely elevated surfaces
// (the dialog, the sticky nav veil).
const SURFACES = {
  white: "bg-card",
  "off-white": "bg-surface",
  "cream-peach": "bg-background",
  "light-amber": "bg-light-amber",
  "purple-tint": "bg-purple-tint",
};

const Card = forwardRef(function Card(
  {
    as: Tag = "div",
    surface = "white",
    bordered = true,
    elevated = false,
    className = "",
    children,
    ...props
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`rounded-card p-section-pad ${SURFACES[surface]} ${
        bordered ? "border border-lavender-mist" : ""
      } ${elevated ? "shadow-subtle-lift" : "shadow-card"} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default Card;
