/**
 * The decorative accent label — Love Ya Like A Sister at 16px with 4px
 * tracking. In the reference this carries credential badges and section
 * eyebrows; it is the only place the second display face appears, which
 * is what keeps the dual-typeface system legible rather than noisy.
 */
/* Both the structural role names and the brand's own colour names are
   accepted, so callers can use whichever reads more clearly. */
const TONES = {
  "warm-orange": "text-warm-taupe",
  "warm-taupe": "text-warm-taupe",
  "golden-amber": "text-soft-sand",
  "soft-sand": "text-soft-sand",
  "deep-purple": "text-charcoal",
  charcoal: "text-charcoal",
  "slate-blue": "text-on-surface-variant",
  // For the one panel dark/bold enough to need a light label — the
  // gradient-accent CTA.
  white: "text-white/80",
};

export default function AccentLabel({
  as: Tag = "p",
  tone = "warm-orange",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={`type-accent-label ${TONES[tone]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
