/**
 * Tag — a small filled pill badge, on the Accent Tint surface (a soft
 * wash of --color-accent, whatever that resolves to in the active
 * edition) with a soft --shadow-badge lift. Distinct from AccentLabel:
 * AccentLabel is plain uppercase eyebrow text with no surface of its
 * own, this is a genuine chip (credential badges, activity tags), the
 * way the Nestology reference uses its tinted surface — kept on the
 * brand's own accent colour rather than theirs.
 */
export default function Tag({ as: Component = "span", icon, className = "", children, ...props }) {
  return (
    <Component
      className={`type-body-small-bold shadow-badge inline-flex items-center gap-xs rounded-pill bg-accent-tint px-md py-xs text-deep-purple ${className}`}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined text-[1em]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </Component>
  );
}
