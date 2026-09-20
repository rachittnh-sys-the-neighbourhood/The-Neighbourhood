import { useState } from "react";
import NavbarV3 from "../v3/NavbarV3.jsx";
import FooterV3 from "../v3/FooterV3.jsx";
import WaitlistDialogV3 from "../v3/WaitlistDialogV3.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import { Container } from "../ui/Section.jsx";
import { LEGAL_META } from "../../data/legalMeta.js";
import Seo from "../seo/Seo.jsx";

/**
 * Shared chrome for all four legal pages (Privacy Policy, Terms &
 * Conditions, Cookie Policy, Disclaimer): the site nav/footer, a header
 * with the title and the effective-date/last-updated/version line, and a
 * sticky "on this page" index next to a comfortably measured reading
 * column. One layout so the four documents can never drift apart
 * visually, and so a fifth (e.g. a Refund Policy) is a five-minute add.
 */
export default function LegalLayout({ title, description, path, sections = [], children }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      {path && <Seo title={title} description={description} path={path} />}

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="pb-xl pt-2xl md:pt-3xl">
          <AccentLabel className="mb-md">Legal</AccentLabel>
          <h1 className="type-section-heading max-w-measure-xl text-deep-purple">
            {title}
          </h1>
          {description && (
            <p className="type-body-large mt-md max-w-measure-lg text-slate-blue">
              {description}
            </p>
          )}

          <dl className="type-caption mt-xl flex flex-wrap gap-x-xl gap-y-xs border-t border-lavender-mist pt-lg text-slate-blue">
            <div>
              <dt className="inline font-semibold text-deep-purple">
                Effective date
              </dt>
              <dd className="ml-1 inline">{LEGAL_META.effectiveDate}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-deep-purple">
                Last updated
              </dt>
              <dd className="ml-1 inline">{LEGAL_META.lastUpdated}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-deep-purple">Version</dt>
              <dd className="ml-1 inline">{LEGAL_META.version}</dd>
            </div>
          </dl>
        </Container>

        <Container className="pb-3xl">
          <div className="md:grid md:grid-cols-12 md:gap-2xl">
            {sections.length > 0 && (
              <nav aria-label="On this page" className="hidden md:col-span-3 md:block">
                <div className="sticky top-3xl">
                  <AccentLabel className="mb-md">On this page</AccentLabel>
                  <ol className="space-y-xs border-l border-lavender-mist">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="type-body-regular -ml-px block border-l border-transparent py-xs pl-md text-slate-blue transition-colors duration-200 hover:border-warm-orange hover:text-deep-purple"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
            )}

            <div className="max-w-measure-xl md:col-span-9">{children}</div>
          </div>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}

/** One numbered/anchored section of legal prose, styled once for all four documents. */
export function LegalSection({ id, heading, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-3xl border-t border-lavender-mist py-xl first:border-t-0 first:pt-0 md:py-2xl"
    >
      <h2 className="type-sub-heading mb-md text-deep-purple">{heading}</h2>
      <div
        className="type-body-large space-y-md text-slate-blue
          [&_a]:text-deep-purple [&_a]:underline [&_a]:decoration-warm-orange/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-deep-purple
          [&_li]:leading-relaxed
          [&_ol]:list-decimal [&_ol]:space-y-xs [&_ol]:pl-lg
          [&_ul]:list-disc [&_ul]:space-y-xs [&_ul]:pl-lg
          [&_strong]:font-semibold [&_strong]:text-deep-purple"
      >
        {children}
      </div>
    </section>
  );
}
