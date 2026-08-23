import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon.jsx";
import Button from "../ui/Button.jsx";

// Anchor to homepage sections. Prefixed with "/" so the links resolve
// correctly even when the navbar is shown on /today.
const LINKS = [
  { label: "Why we exist", href: "/#the-question" },
  { label: "What we're building", href: "/#today" },
  { label: "Our story", href: "/story" },
  { label: "FAQ", href: "/faq" },
];

/**
 * Full-width bar on the warm page wash. Nav items are Body Regular in
 * Deep Purple — the reference gives nav links the same treatment as
 * paragraph text, which is what keeps the bar quiet next to the one
 * amber CTA. Once scrolled it gains a Lavender Mist hairline and the
 * single validated shadow; nothing heavier.
 *
 * `links` and `homePath` default to the homepage, so existing callers are
 * unaffected.
 */
export default function NavbarV3({
  onJoin,
  onLogoClick,
  links = LINKS,
  homePath = "/",
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // The backdrop-filter lives on this inner bar, not on <nav> itself —
  // backdrop-filter on an ancestor becomes the containing block for
  // position:fixed descendants, which would collapse the full-height
  // mobile overlay below down to the bar's own height.
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-lavender-mist bg-cream-peach/95 shadow-subtle-lift backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-3xl max-w-page items-center justify-between px-lg md:px-xl lg:px-2xl">
          <Link
            to={homePath}
            onClick={(e) => {
              closeMenu();
              onLogoClick?.(e);
            }}
            className="flex items-center gap-sm"
            aria-label="The Neighbourhood, back to home"
          >
            <LogoIcon className="logo-draw h-2xl w-2xl shrink-0" />
            <span className="type-card-heading whitespace-nowrap text-deep-purple">
              The Neighbourhood
            </span>
          </Link>

          <div className="hidden items-center gap-xl lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-md">
            {/* The responsive display lives on this wrapper, NOT on the
                Button. Button's base class list already contains
                inline-flex, and Tailwind emits .inline-flex after .hidden
                in the stylesheet — same specificity, so the later one won
                and "hidden" silently did nothing. The CTA was rendering
                on top of the wordmark on small screens. A wrapper with no
                competing display utility is the reliable fix. */}
            <span className="hidden lg:inline-flex">
              <Button onClick={onJoin}>Join the Village</Button>
            </span>

            {/* Hamburger — only visible below lg, where the link row is
                hidden. Toggles the full-screen overlay below. */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative flex h-lg w-lg shrink-0 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-0.5 w-lg rounded-pill bg-deep-purple transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute h-0.5 w-lg rounded-pill bg-deep-purple transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu overlay. */}
      <div
        className={`fixed inset-x-0 bottom-0 top-3xl bg-cream-peach transition-opacity duration-300 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-lg pb-2xl pt-xl">
          <div className="flex flex-col">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`reveal ${
                  menuOpen ? "in-view" : ""
                } type-sub-heading border-b border-lavender-mist py-md text-deep-purple`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button
            size="lg"
            onClick={() => {
              closeMenu();
              onJoin?.();
            }}
            className="mt-auto w-full"
          >
            Join the Village
          </Button>
        </div>
      </div>
    </nav>
  );
}
