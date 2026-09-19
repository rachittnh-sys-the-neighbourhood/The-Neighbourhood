import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import { Container } from "../ui/Section.jsx";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const LINKEDIN_URL = "https://www.linkedin.com/company/theneighbourhud/";

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function EmailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Footer sits on --color-primary — the same warm grey as the site's CTA
 * buttons, so the header and footer bookend the page in one colour. Text,
 * icons and links flip to white/light variants accordingly, the same
 * treatment the dark Invitation card uses above.
 */
export default function FooterV3({ minimal = false }) {
  if (minimal) {
    return (
      <footer className="bg-light-amber py-lg">
        <Container className="text-center">
          <p className="type-caption font-normal text-slate-blue">
            The Neighbourhood &middot; A little support for today.
          </p>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-primary py-2xl">
      <Container className="flex flex-col items-center gap-lg">
        <LogoIcon className="h-2xl w-2xl" color="white" />

        <p className="type-sub-heading text-white">The Neighbourhood</p>

        <AccentLabel tone="white" className="text-center">
          Safe Spaces, Warm Hearts, Bright Futures
        </AccentLabel>

        <div className="flex items-center gap-lg">
          <a
            href="mailto:founders@theneighbourhood.co.in"
            aria-label="Email The Neighbourhood at founders@theneighbourhood.co.in"
            title="founders@theneighbourhood.co.in"
            className="text-white/80 transition-colors duration-200 hover:text-white"
          >
            <EmailIcon className="h-lg w-lg" />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Neighbourhood on LinkedIn"
            className="text-white/80 transition-colors duration-200 hover:text-white"
          >
            <LinkedInIcon className="h-lg w-lg" />
          </a>
        </div>

        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center justify-center gap-x-lg gap-y-xs"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="type-caption font-normal text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="type-caption w-full border-t border-white/20 pt-lg text-center font-normal text-white/70">
          &copy; {new Date().getFullYear()} The Neighbourhood &middot; Gurugram,
          India
        </p>
      </Container>
    </footer>
  );
}
